module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: 'transparent',
			accent: {
				primary: '#FFB224',
				danger: '#F2555A',
				success: '#3CB179',
				warning: '#F5D90A',
			},
			bg: {
				1: '#161615',
				2: '#1C1C1A',
				danger: '#481A1D',
				warning: '#352800',
				success: '#113123',
			},
			border: {
				1: '#2E2E2B',
				2: '#51504B',
			},
			text: {
				1: '#EDEDEC',
				2: '#A1A09A',
				button: '#161615',
			},
		},
		fontFamily: {
			sans: 'Inter, Arial, sans-serif',
		},
		extend: {},
	},
	variants: {
		extend: {
			borderColor: ['active'],
			borderOpacity: ['hover'],
			opacity: ['disabled'],
			border: ['hover'],
		},
	},
	plugins: [],
}
