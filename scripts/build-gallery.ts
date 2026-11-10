import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface AlbumJson {
  title: string;
  title_id?: string;
  category: 'project' | 'teaching' | 'event' | 'organization' | 'internship';
  period: string;
  summary: string;
  summary_id?: string;
  description: string;
  description_id?: string;
  role: string;
  role_id?: string;
  tags?: string[];
  link?: { label: string; href: string };
  frameBg: 'black' | 'white';
  featured?: boolean;
  order?: number;
  photos?: { file: string; alt: string; caption?: string; caption_id?: string }[];
}

interface ProcessedPhoto {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

interface Album extends AlbumJson {
  photos: ProcessedPhoto[];
}

const SRC_ROOT = path.join(process.cwd(), 'gallery-src');
const PUBLIC_ROOT = path.join(process.cwd(), 'public', 'images', 'gallery');
const OUT_JSON = path.join(process.cwd(), 'src', 'data', 'gallery.generated.json');

async function processAlbum(albumDir: string, force = false): Promise<{ album: Album; warnings: string[] }> {
  const albumPath = path.join(SRC_ROOT, albumDir, 'album.json');
  const raw = JSON.parse(fs.readFileSync(albumPath, 'utf-8')) as AlbumJson;
  const warnings: string[] = [];

  // Check for empty fields
  if (!raw.summary?.trim()) warnings.push('empty summary');
  if (!raw.description?.trim()) warnings.push('empty description');
  if (!raw.title?.trim()) warnings.push('empty title');
  if (!raw.period?.trim()) warnings.push('empty period');
  if (!raw.role?.trim()) warnings.push('empty role');

  // Determine photo list order
  let photoDefs = raw.photos;
  if (!photoDefs) {
    const files = fs.readdirSync(path.join(SRC_ROOT, albumDir)).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
    photoDefs = files.map(f => ({ file: f, alt: '' }));
    warnings.push('photos field missing, using sorted files');
  }

  // Check extra files in folder not listed
  const folderFiles = fs.readdirSync(path.join(SRC_ROOT, albumDir)).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const listedFiles = photoDefs.map(p => p.file);
  const extraFiles = folderFiles.filter(f => !listedFiles.includes(f));
  if (extraFiles.length) warnings.push(`extra files not listed: ${extraFiles.join(', ')}`);

  const processed: ProcessedPhoto[] = [];
  const outAlbumDir = path.join(PUBLIC_ROOT, albumDir);
  if (!fs.existsSync(outAlbumDir)) fs.mkdirSync(outAlbumDir, { recursive: true });

  for (const p of photoDefs) {
    const srcFile = path.join(SRC_ROOT, albumDir, p.file);
    if (!fs.existsSync(srcFile)) {
      warnings.push(`listed photo missing: ${p.file}`);
      continue;
    }
    if (!p.alt?.trim()) warnings.push(`empty alt for ${p.file}`);
    const baseName = path.parse(p.file).name;
    const outFull = path.join(outAlbumDir, `${baseName}.webp`);
    const outThumb = path.join(outAlbumDir, `${baseName}.thumb.webp`);
    const srcStat = fs.statSync(srcFile);
    const needFull = force || !fs.existsSync(outFull) || fs.statSync(outFull).mtimeMs < srcStat.mtimeMs;
    const needThumb = force || !fs.existsSync(outThumb) || fs.statSync(outThumb).mtimeMs < srcStat.mtimeMs;

    let metadata = { width: 0, height: 0 } as sharp.OutputInfo;
    if (needFull) {
      const img = sharp(srcFile).rotate().resize({ width: 1920, height: 1920, fit: 'inside' }).webp({ quality: 80 });
      await img.toFile(outFull);
      metadata = await sharp(outFull).metadata();
    } else {
      const meta = await sharp(outFull).metadata();
      if (meta.width && meta.height) {
        metadata.width = meta.width;
        metadata.height = meta.height;
      }
    }
    if (needThumb) {
      await sharp(srcFile).rotate().resize({ width: 800, height: 800, fit: 'inside' }).webp({ quality: 78 }).toFile(outThumb);
    }
    processed.push({
      src: `/images/gallery/${albumDir}/${path.basename(outFull)}`,
      thumb: `/images/gallery/${albumDir}/${path.basename(outThumb)}`,
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      alt: p.alt || raw.title,
      caption: p.caption,
    });
  }

  // Add Indonesian fallbacks
  const album: Album = {
    ...raw,
    title_id: raw.title_id ?? raw.title,
    summary_id: raw.summary_id ?? raw.summary,
    description_id: raw.description_id ?? raw.description,
    role_id: raw.role_id ?? raw.role,
    photos: processed,
  } as Album;

  return { album, warnings };
}

async function main() {
  const force = process.argv.includes('--force');
  const dirs = fs.readdirSync(SRC_ROOT).filter(d => fs.statSync(path.join(SRC_ROOT, d)).isDirectory());
  const albums: Album[] = [];
  const allWarnings: Map<string, string[]> = new Map();
  for (const d of dirs) {
    const { album, warnings } = await processAlbum(d, force);
    albums.push(album);
    if (warnings.length) allWarnings.set(album.title, warnings);
  }
  // order albums: featured first, then order field, then name
  albums.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const ao = (a as any).order ?? 0;
    const bo = (b as any).order ?? 0;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
  const out = { albums };
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2), 'utf-8');

  // Print table
  console.log('Album | Photos | Total KB | Warnings');
  console.log('--- | --- | --- | ---');
  for (const a of albums) {
    const size = a.photos.reduce((s, p) => {
      const f = path.join(process.cwd(), 'public', p.src.replace('/images/', 'images/'));
      if (fs.existsSync(f)) s += fs.statSync(f).size;
      return s;
    }, 0);
    const kb = (size / 1024).toFixed(1);
    const warn = allWarnings.get(a.title)?.join('; ') ?? '';
    console.log(`${a.title} | ${a.photos.length} | ${kb} | ${warn}`);
  }
}

main().catch(e => {
  console.error('Error building gallery:', e);
  process.exit(1);
});