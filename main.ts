const fs = require('node:fs');
const path = require('node:path');

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? '/output';

const src = path.join(__dirname, 'dish.jpg');
const dest = path.join(outDir, 'entry.png');

try {
  if (!fs.existsSync(src)) {
    throw new Error(`source image not found: ${src}`);
  }
  fs.mkdirSync(outDir, { recursive: true });
  // Byte-for-byte copy: the JPEG is delivered as-is, never re-encoded.
  fs.copyFileSync(src, dest);
  process.exit(0);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`failed to copy ${src} -> ${dest}: ${message}`);
  process.exit(1);
}