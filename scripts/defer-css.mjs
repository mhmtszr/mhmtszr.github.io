import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'out');

async function getHtmlFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function deferCss(html) {
  return html.replace(
    /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+\.css)" data-precedence="[^"]*"\/>/g,
    (_, href) =>
      `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"/>` +
      `<noscript><link rel="stylesheet" href="${href}"/></noscript>`
  );
}

async function main() {
  const files = await getHtmlFiles(OUT_DIR);
  let modified = 0;

  for (const file of files) {
    const original = await readFile(file, 'utf8');
    const updated = deferCss(original);
    if (updated !== original) {
      await writeFile(file, updated, 'utf8');
      modified++;
    }
  }

  console.log(`Deferred CSS in ${modified}/${files.length} HTML files`);
}

main().catch(err => {
  console.error('defer-css failed:', err);
  process.exit(1);
});
