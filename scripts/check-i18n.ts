#!/usr/bin/env node
import fs from "fs";
import path from "path";

const messagesDir = path.join(process.cwd(), "src", "messages");
const enPath = path.join(messagesDir, "en.json");
const idPath = path.join(messagesDir, "id.json");

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...flattenKeys(v as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function main() {
  if (!fs.existsSync(enPath) || !fs.existsSync(idPath)) {
    console.error("❌ Missing en.json or id.json");
    process.exit(1);
  }

  const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));
  const id = JSON.parse(fs.readFileSync(idPath, "utf-8"));

  const enKeys = flattenKeys(en).sort();
  const idKeys = flattenKeys(id).sort();

  const missingInId = enKeys.filter((k) => !idKeys.includes(k));
  const missingInEn = idKeys.filter((k) => !enKeys.includes(k));

  if (missingInId.length > 0) {
    console.error("❌ Keys in EN but missing in ID:");
    missingInId.forEach((k) => console.error(`  - ${k}`));
  }

  if (missingInEn.length > 0) {
    console.error("❌ Keys in ID but missing in EN:");
    missingInEn.forEach((k) => console.error(`  - ${k}`));
  }

  if (missingInId.length === 0 && missingInEn.length === 0) {
    console.log("✅ All translation keys match between EN and ID");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();