import sharp from 'sharp';
const [rgbPath, maskPath, stripes, paper, bag] = process.argv.slice(2);
const { data: rgb, info } = await sharp(rgbPath).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { data: mask } = await sharp(maskPath).extractChannel(0).raw().toBuffer({ resolveWithObject: true });
const n = info.width * info.height;
const color = Buffer.alloc(n * 4), white = Buffer.alloc(n * 4);
for (let i = 0; i < n; i++) {
  const r = rgb[i*3], g = rgb[i*3+1], b = rgb[i*3+2], a = mask[i];
  color.set([r, g, b, a], i*4);
  const w = Math.min(r, g, b) / 255;
  const k = Math.max(0, Math.min(1, (1 - w) / 0.72));
  white.set([255, 255, 255, Math.round(a * k)], i*4);
}
const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
await sharp(color, raw).trim().png({ compressionLevel: 9 }).toFile('public/img/brand/logo.png');
await sharp(white, raw).trim().png({ compressionLevel: 9 }).toFile('public/img/brand/logo-white.png');
await sharp(stripes).resize(1600).webp({ quality: 70 }).toFile('public/img/brand/stripes.webp');
await sharp(paper).resize(1400).webp({ quality: 72 }).toFile('public/img/brand/mockup-paper.webp');
await sharp(bag).resize(1400).webp({ quality: 72 }).toFile('public/img/brand/mockup-backpack.webp');
console.log(info.width, info.height);
