module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx,json}",
		// "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		fontFamily: {
			primary: "Orbitron",
			secondary: "Open Sans",
			tertiary: "Aldrich",
		},
		container: {
			padding: {
				DEFAULT: "15px",
			},
		},
		screens: {
			// xs: "320px",
			sm: "320px",
			md: "768px",
			lg: "960px",
			xl: "1200px",
		},
		extend: {
			colors: {
				primary: "#0a0a0a",
				accent: "#B809C3",
			},
			backgroundImage: {
				// home: "url('./assets/hero.png')",
				// about: "url('./assets/MyImage.jpg')",
			},
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
	],
};
