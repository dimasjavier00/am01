import sharp from 'sharp';
const ids = process.argv.slice(2);
const out = 'public/img/cars';
const tiles = [];
for (const [n, id] of ids.entries()) {
  const res = await fetch(`https://images.unsplash.com/${id}?w=1400&q=80&fm=jpg`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize(1200, 800, { fit: 'cover' }).webp({ quality: 72 }).toFile(`${out}/${id}.webp`);
  const t = await sharp(buf).resize(300, 200, { fit: 'cover' })
    .composite([{ input: Buffer.from(`<svg width="300" height="200"><rect width="44" height="26" fill="black"/><text x="6" y="20" font-size="20" fill="white" font-family="Arial">${n}</text></svg>`) }])
    .png().toBuffer();
  tiles.push({ input: t, left: (n % 6) * 300, top: Math.floor(n / 6) * 200 });
}
const rows = Math.ceil(ids.length / 6);
await sharp({ create: { width: 1800, height: rows * 200, channels: 3, background: '#fff' } }).composite(tiles).jpeg().toFile(process.env.SHEET);
