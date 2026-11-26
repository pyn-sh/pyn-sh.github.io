import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/** Folder holding the documents of the pyn repository (a sibling checkout by default). */
export const DOCS_DIR = resolve(process.env.PYN_DOCS_DIR ?? '../pyn/docs');

if (!existsSync(DOCS_DIR)) {
	throw new Error(
		`Pyn documents not found at ${DOCS_DIR}. Clone https://github.com/pyn-sh/pyn next to this folder or set PYN_DOCS_DIR.`,
	);
}

export const REPO_URL = 'https://github.com/pyn-sh/pyn';
export const SITE_REPO_URL = 'https://github.com/pyn-sh/pyn-sh.github.io';

/** Route for a document id such as `adr/README` or `issues/PYN-001`. */
export function docRoute(id) {
	const slug = id.toLowerCase().replace(/(^|\/)readme$/, '');
	return slug ? `/docs/${slug.replace(/\/$/, '')}/` : '/docs/';
}
