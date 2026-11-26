// Derives every shipped raster from src/assets/pyn-logo-original.png.
// Usage: node scripts/brand-assets.mjs
import sharp from 'sharp';

const SOURCE = 'src/assets/pyn-logo-original.png';
const INDIGO = [29, 18, 138];

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const counts = new Map();
for (let i = 0; i < data.length; i += 4) {
	const [r, g, b, a] = data.subarray(i, i + 4);
	// Remove the pure-blue fringe left around the speed lines by background removal.
	if (a > 0 && b > 190 && r < 25 && g < 40) data.set(INDIGO, i);
	if (a < 6) data[i + 3] = 0;
	if (a === 255) {
		const key = [data[i], data[i + 1], data[i + 2]].map((v) => v >> 2 << 2).join(',');
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
}
console.log([...counts].sort((x, y) => y[1] - x[1]).slice(0, 8));

const clean = await sharp(data, { raw: info }).png().toBuffer();
const trimmed = await sharp(clean).trim({ threshold: 10 }).png().toBuffer();
const { width, height } = await sharp(trimmed).metadata();
console.log('trimmed', width, height);

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const square = (size) => sharp(trimmed).resize(size, size, { fit: 'contain', background: clear });

await square(960).png().toFile('src/assets/pyn-logo.png');
await square(32).png().toFile('public/favicon-32.png');
await square(192).png().toFile('public/favicon-192.png');

const mark = await square(144).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
	.composite([{ input: mark, left: 18, top: 18 }])
	.png()
	.toFile('public/apple-touch-icon.png');

const hero = await square(440).png().toBuffer();
const words = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <g font-family="Manrope, Helvetica, Arial, sans-serif" fill="#140c63">
    <text x="90" y="300" font-size="150" font-weight="800">Pyn</text>
    <text x="94" y="372" font-size="34" font-weight="600">One command surface for Python projects</text>
    <text x="94" y="430" font-size="26" fill="#4b4a6b">In planning. No release yet.</text>
  </g></svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#f5f6fd' } })
	.composite([{ input: words }, { input: hero, left: 720, top: 95 }])
	.png()
	.toFile('public/og.png');
