import { dirname, relative, resolve, sep } from 'node:path';
import { visit } from 'unist-util-visit';
import { DOCS_DIR, REPO_URL, docRoute } from './paths.mjs';

/** Maps a relative link inside the documents to a site route or a GitHub URL. */
function rewrite(href, filePath) {
	if (/^([a-z]+:|#|\/)/i.test(href)) return href;
	const [path, hash] = href.split('#');
	const target = relative(DOCS_DIR, resolve(dirname(filePath), path)).split(sep).join('/');
	const anchor = hash ? `#${hash}` : '';
	if (target.startsWith('..')) return `${REPO_URL}/blob/main/${target.replace(/^(\.\.\/)+/, '')}${anchor}`;
	if (target.endsWith('.md')) return docRoute(target.slice(0, -3)) + anchor;
	if (target.endsWith('.feature')) return `/docs/${target.toLowerCase().replace(/\.feature$/, '')}/${anchor}`;
	return `${REPO_URL}/tree/main/docs/${target}${anchor}`;
}

export function rehypeDocs() {
	return (tree, file) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'a' && typeof node.properties.href === 'string' && file.path) {
				node.properties.href = rewrite(node.properties.href, file.path);
			}
			if (node.tagName === 'input' && node.properties.type === 'checkbox') {
				node.properties.ariaLabel = node.properties.checked ? 'Done' : 'Not done';
			}
			// Wide tables scroll inside their own focusable region.
			if (node.tagName === 'table' && parent && !parent.properties?.dataTable) {
				parent.children[index] = {
					type: 'element',
					tagName: 'div',
					properties: { className: ['table-scroll'], dataTable: true, tabIndex: 0, role: 'region', ariaLabel: 'Table' },
					children: [node],
				};
			}
		});
	};
}
