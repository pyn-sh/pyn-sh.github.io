import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { rehypeDocs } from './src/lib/rehype-docs.mjs';

export default defineConfig({
	site: 'https://pyn-sh.github.io',
	trailingSlash: 'always',
	markdown: {
		processor: unified({ rehypePlugins: [rehypeDocs] }),
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'math'] },
		shikiConfig: { themes: { light: 'github-light-high-contrast', dark: 'github-dark' } },
	},
	vite: { plugins: [tailwindcss()] },
});
