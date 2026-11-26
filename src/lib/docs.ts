import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection } from 'astro:content';
import { DOCS_DIR, docRoute } from './paths.mjs';

export interface Page {
	title: string;
	href: string;
}
export interface Group {
	name: string;
	icon: string;
	pages: Page[];
}

const plain = (text: string) => text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*]/g, '').trim();

export const titleOf = (body: string, fallback: string) => plain(body.match(/^# (.+)$/m)?.[1] ?? fallback);

export function features() {
	const dir = join(DOCS_DIR, 'specifications/features');
	return readdirSync(dir)
		.filter((name) => name.endsWith('.feature'))
		.sort()
		.map((name) => {
			const source = readFileSync(join(dir, name), 'utf8');
			const slug = name.replace(/\.feature$/, '');
			return {
				slug,
				source,
				title: source.match(/^Feature: (.+)$/m)?.[1] ?? slug,
				href: `/docs/specifications/features/${slug}/`,
			};
		});
}

const GROUPS: [prefix: string, name: string, icon: string, order: string[]][] = [
	['', 'Plan', 'map', ['README', 'ROADMAP', 'risk-register']],
	['milestones/', 'Milestones', 'flag', ['README']],
	['issues/', 'Issues and tasks', 'list-checks', ['README']],
	['product/', 'Product', 'compass', ['executive-summary', 'problem-and-vision', 'requirements', 'mvp', 'non-goals']],
	['research/', 'Research', 'search', ['ecosystem-analysis', 'competitive-analysis', 'integration-feasibility', 'opportunity-analysis']],
	['architecture/', 'Architecture', 'blocks', ['overview']],
	['specifications/', 'Specifications', 'file-text', ['cli', 'configuration', 'output-and-exit-codes', 'features/README']],
	['adr/', 'Decisions', 'scale', ['README']],
	['security/', 'Security', 'shield', ['threat-model']],
	['quality/', 'Quality', 'flask-conical', []],
];

export async function navigation(): Promise<Group[]> {
	const entries = await getCollection('docs');
	const featurePages = features().map(({ title, href }) => ({ title, href }));
	return GROUPS.map(([prefix, name, icon, order]) => {
		const rank = (id: string) => {
			const at = order.indexOf(id.slice(prefix.length));
			return at === -1 ? order.length : at;
		};
		const pages = entries
			.filter((e) => (prefix ? e.id.startsWith(prefix) : !e.id.includes('/')))
			.sort((a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id))
			.map((e) => ({
				title: e.id === 'README' ? 'Documentation index' : titleOf(e.body ?? '', e.id),
				href: docRoute(e.id),
			}));
		return { name, icon, pages: prefix === 'specifications/' ? [...pages, ...featurePages] : pages };
	});
}

export async function milestones() {
	const entries = await getCollection('docs', (e) => /^milestones\/M\d/.test(e.id));
	return entries
		.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
		.map((e) => {
			const body = e.body ?? '';
			const [id = '', ...rest] = titleOf(body, e.id).split(': ');
			return {
				id,
				name: rest.join(': '),
				href: docRoute(e.id),
				status: body.match(/Status: \*\*(.+?)\*\*/)?.[1] ?? 'Unknown',
				objective: plain(body.match(/## Objective\n(.+)/)?.[1] ?? ''),
			};
		});
}
