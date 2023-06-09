/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				headline: ['Pacifico'],
				standard: ['Arvo']
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				white: '#FFFFFF',
				black: '#000000',
				green: '#D5EDE2',
				brown: '#F0C5C0',
				orange: '#F84F39'
			}
		}
	},

	plugins: []
};
