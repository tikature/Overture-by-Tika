#!/usr/bin/env tsx
import { getProjects } from "../src/lib/projects-source";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      process.env[key] = value;
    });
  }
}

loadEnv();

interface ManifestEntry {
  image: boolean;
  embeddable: boolean;
  updatedAt: string;
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function checkEmbeddable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return false;

    const xfo = res.headers.get("x-frame-options");
    if (xfo && /DENY|SAMEORIGIN/i.test(xfo)) return false;

    const csp = res.headers.get("content-security-policy");
    if (csp) {
      const frameAncestorsMatch = csp.match(/frame-ancestors\s+([^;]+)/i);
      if (frameAncestorsMatch) {
        const ancestors = frameAncestorsMatch[1].trim();
        if (ancestors !== "*" && !ancestors.includes("'self'") && !ancestors.includes("*")) {
          return false;
        }
      }
    }
    return true;
  } catch {
    return false;
  }
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host === "::1") return false;
    if (/^10\.|^172\.(1[6-9]|2\d|3[0-1])\.|^192\.168\./.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

async function hideCookieBanners(page: any) {
  const selectors = [
    '[id*="cookie"]',
    '[class*="cookie"]',
    '[id*="consent"]',
    '[class*="consent"]',
    '[id*="gdpr"]',
    '[class*="gdpr"]',
    '[aria-label*="cookie" i]',
    '[aria-label*="consent" i]',
    '.cookie-banner',
    '.consent-banner',
    '#cookie-notice',
    '#consent-banner',
    'iframe[src*="chat"]',
    'iframe[src*="intercom"]',
    'iframe[src*="crisp"]',
    '[class*="chat-widget"]',
    '[class*="launcher"]',
  ];
  for (const sel of selectors) {
    try {
      await page.addStyleTag({
        content: `${sel} { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }`,
      });
    } catch {
      // ignore
    }
  }
}

async function captureScreenshot(page: any, url: string, outFile: string, retries = 1): Promise<boolean> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(2500);
      await hideCookieBanners(page);
      await page.screenshot({ path: outFile, type: "jpeg", quality: 80, fullPage: false });
      return true;
    } catch (e) {
      if (attempt === retries) throw e;
      console.log(`   ↳ Retry ${attempt + 1}/${retries} for ${url}`);
      await page.waitForTimeout(2000);
    }
  }
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const onlyIdx = args.indexOf("--only");
  const onlyKey = onlyIdx !== -1 && args[onlyIdx + 1] ? args[onlyIdx + 1].toLowerCase() : null;

  console.log("🔎 Fetching projects...");
  const projects = await getProjects();

  const outDir = path.join(ROOT, "public", "images", "projects");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const manifestPath = path.join(outDir, "manifest.json");
  let manifest: Record<string, ManifestEntry> = {};
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    } catch {
      manifest = {};
    }
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    userAgent: USER_AGENT,
  });

  let success = 0, skipped = 0, failed = 0;
  const results: Array<{ key: string; status: string; detail: string }> = [];

  const concurrency = 2;
  for (let i = 0; i < projects.length; i += concurrency) {
    const batch = projects.slice(i, i + concurrency);
    await Promise.all(batch.map(async (proj) => {
      const key = proj.slug.toLowerCase();
      if (onlyKey && key !== onlyKey) return;

      const hasLive = !!proj.liveUrl && isSafeUrl(proj.liveUrl!);
      const existing = manifest[key];
      const outFile = path.join(outDir, `${key}.jpg`);

      if (!hasLive) {
        manifest[key] = { image: false, embeddable: false, updatedAt: new Date().toISOString() };
        skipped++;
        results.push({ key, status: "SKIP", detail: "no live URL" });
        return;
      }

      const needImage = force || !existing?.image || !fs.existsSync(outFile);
      if (!needImage) {
        const embeddable = await checkEmbeddable(proj.liveUrl!);
        manifest[key] = { image: true, embeddable, updatedAt: new Date().toISOString() };
        success++;
        results.push({ key, status: "OK", detail: "image exists" });
        return;
      }

      const page = await context.newPage();
      try {
        await captureScreenshot(page, proj.liveUrl!, outFile);
        await page.close();

        const embeddable = await checkEmbeddable(proj.liveUrl!);
        manifest[key] = { image: true, embeddable, updatedAt: new Date().toISOString() };
        success++;
        results.push({ key, status: "OK", detail: "screenshot saved" });
      } catch (e) {
        await page.close().catch(() => {});
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`❌ ${key}: ${msg}`);
        manifest[key] = { image: false, embeddable: false, updatedAt: new Date().toISOString() };
        failed++;
        results.push({ key, status: "FAIL", detail: msg });
      }
    }));
  }

  await browser.close();
  await context.close();

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log("\n--- Results ---");
  console.log(
    results
      .map((r) => `${r.status.padEnd(4)} ${r.key.padEnd(30)} ${r.detail}`)
      .join("\n")
  );
  console.log("\n--- Summary ---");
  console.log(`✅ Success: ${success}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Manifest written to ${manifestPath}`);
  process.exit(failed > 0 ? 1 : 0);
}

main();