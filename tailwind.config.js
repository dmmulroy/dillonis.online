const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'mode-color': 'var(--mode-color)'
			},
			fontFamily: {
				defaultMono: [...fontFamily.mono],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			}
		}
	},
	plugins: [
		require('@catppuccin/tailwindcss')({
			// prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
			// default is `false`, which means no prefix
			prefix: 'ctp',
			// which flavour of colours to use by default, in the `:root`
			defaultFlavour: 'macchiato'
		})
	]
};
