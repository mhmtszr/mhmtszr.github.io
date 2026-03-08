import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, parse } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const PHOTO_DIR = join(ROOT, "public/photography");
const ARTICLE_DIR = join(ROOT, "public/article");
const OG_SRC = join(ROOT, "public/opengraph-image.png");
const OG_DEST = join(ROOT, "public/og-background.png");

let totalBefore = 0;
let totalAfter = 0;

async function fileSize(path) {
  return (await stat(path)).size;
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

// ── Photography JPGs → WebP (thumb + full) ──
async function convertPhotography() {
  console.log("\n📸 Photography JPGs → WebP\n");
  const files = (await readdir(PHOTO_DIR)).filter(
    (f) => f.endsWith(".jpg") && f !== "profile.jpg"
  );

  let before = 0;
  let after = 0;

  for (const file of files) {
    const src = join(PHOTO_DIR, file);
    const { name } = parse(file);
    const thumbDest = join(PHOTO_DIR, `${name}-thumb.webp`);
    const fullDest = join(PHOTO_DIR, `${name}.webp`);
    const srcSize = await fileSize(src);
    before += srcSize;

    // Thumb: 800px wide, q90
    await sharp(src).resize(800, null, { withoutEnlargement: true }).webp({ quality: 90 }).toFile(thumbDest);
    const thumbSize = await fileSize(thumbDest);

    // Full: 1920px wide, q90
    await sharp(src).resize(1920, null, { withoutEnlargement: true }).webp({ quality: 90 }).toFile(fullDest);
    const fullSize = await fileSize(fullDest);

    after += thumbSize + fullSize;
    console.log(
      `  ${file}: ${mb(srcSize)} MB → thumb ${mb(thumbSize)} MB + full ${mb(fullSize)} MB`
    );

    await unlink(src);
  }

  totalBefore += before;
  totalAfter += after;
  console.log(
    `\n  Photography total: ${mb(before)} MB → ${mb(after)} MB (saved ${mb(before - after)} MB)`
  );
}

// ── Article PNGs → WebP ──
async function convertArticles() {
  console.log("\n📝 Article PNGs → WebP\n");
  let before = 0;
  let after = 0;

  const articleDirs = await readdir(ARTICLE_DIR);
  for (const dir of articleDirs) {
    const dirPath = join(ARTICLE_DIR, dir);
    const dirStat = await stat(dirPath);
    if (!dirStat.isDirectory()) continue;

    const files = (await readdir(dirPath)).filter((f) => f.endsWith(".png"));
    for (const file of files) {
      const src = join(dirPath, file);
      const { name } = parse(file);
      const dest = join(dirPath, `${name}.webp`);
      const srcSize = await fileSize(src);
      before += srcSize;

      await sharp(src)
        .resize(1200, null, { withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(dest);
      const destSize = await fileSize(dest);
      after += destSize;

      console.log(`  ${dir}/${file}: ${mb(srcSize)} MB → ${mb(destSize)} MB`);
      await unlink(src);
    }
  }

  totalBefore += before;
  totalAfter += after;
  console.log(
    `\n  Articles total: ${mb(before)} MB → ${mb(after)} MB (saved ${mb(before - after)} MB)`
  );
}

// ── OG background (keep as PNG since satori doesn't support WebP) ──
async function convertOG() {
  console.log("\n🖼️  OG background → optimized PNG\n");
  const srcSize = await fileSize(OG_SRC);
  totalBefore += srcSize;

  await sharp(OG_SRC)
    .resize(1200, null, { withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(OG_DEST);
  const destSize = await fileSize(OG_DEST);
  totalAfter += destSize;

  console.log(`  opengraph-image.png: ${mb(srcSize)} MB → ${mb(destSize)} MB`);
  await unlink(OG_SRC);
}

// ── Run ──
await convertPhotography();
await convertArticles();
await convertOG();

console.log(
  `\n✅ Done! Total: ${mb(totalBefore)} MB → ${mb(totalAfter)} MB (saved ${mb(totalBefore - totalAfter)} MB)\n`
);
