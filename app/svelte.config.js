import adapter from "@sveltejs/adapter-node";
import path from "path";
import preprocess from "svelte-preprocess";

// /** @type {import('vite').Plugin} */
// const somePlugin = {
// 	name: 'vite-middleware',
// 	async configureServer(_server) {}
// 	},
// };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [/*somePlugin*/],
			resolve: {
				alias: {
					$src: path.resolve("./src"),
					$lib: path.resolve("./src/lib"),
					$components: path.resolve("./src/components"),
					$generated: path.resolve("./.svelte-kit/types/src"),
				},
			},
			server: {
				port: 3000,
				hmr: {
					protocol: "ws",
					host: "localhost",
					port: 3000,
				},
			},
			optimizeDeps: {
				include: ["sha.js", "base64url", "jsonwebtoken", "cookie"],
			},
		},
	},
};

export default config;
