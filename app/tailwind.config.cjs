module.exports = {
	mode: "jit",
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		// require('@tailwindcss/typography'),
	],
	content: ["./src/**/*.{html,js,svelte,ts}"],
};
