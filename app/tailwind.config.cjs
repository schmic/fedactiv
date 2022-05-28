module.exports = {
	mode: "jit",
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('daisyui')
	],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	daisyui: {
		styled: true,
		themes: ["light", "business", "corporate"],
	}
};
