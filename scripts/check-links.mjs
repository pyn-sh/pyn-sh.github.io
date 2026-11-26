// Verifies every internal link and anchor in the built site.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const files = readdirSync(DIST, { recursive: true }).filter((f) => f.endsWith('.html'));
const ids = new Map();
const idsOf = (file) => {
	if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
	return ids.get(file);
};
const broken = [];
let count = 0;
for (const file of files) {
	const html = readFileSync(join(DIST, file), 'utf8');
	const page = `/${file.replace(/index\.html$/, '')}`;
	for (const [, raw] of html.matchAll(/<(?:a|link|img|script)\b[^>]*?\s(?:href|src)="([^"]*)"/g)) {
		if (/^([a-z]+:|\/\/)/i.test(raw)) continue;
		count++;
		const url = new URL(raw.replaceAll('&amp;', '&'), `https://site.invalid${page}`);
		let target = join(DIST, decodeURIComponent(url.pathname));
		if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
		if (!existsSync(target)) broken.push(`${page} -> ${raw}`);
		else if (url.hash.length > 1 && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(url.hash.slice(1))))
			broken.push(`${page} -> ${raw} (missing anchor)`);
	}
}
console.log(`pages ${files.length} | internal links ${count} | broken ${broken.length}`);
if (broken.length) {
	console.error(broken.join('\n'));
	process.exit(1);
}
