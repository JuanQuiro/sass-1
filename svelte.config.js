import { mdsvex } from 'mdsvex';
import adapterVercel from '@sveltejs/adapter-vercel';
import adapterAuto from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: process.env.VERCEL ? adapterVercel() : adapterAuto()
	},
	extensions: ['.svelte', '.svx']
};

export default config;
