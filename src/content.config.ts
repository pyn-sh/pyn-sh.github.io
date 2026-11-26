import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { DOCS_DIR } from './lib/paths.mjs';

const docs = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: DOCS_DIR,
		generateId: ({ entry }) => entry.replace(/\.md$/, ''),
	}),
});

export const collections = { docs };
