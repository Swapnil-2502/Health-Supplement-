const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.html'],
	plugins: [
		// Iconify plugin
		addDynamicIconSelectors(),
	],
};

// tailwind.config.js

module.exports = {
	theme: {
	  extend: {
		fontFamily: {
		  'gt-walsheim': ['"GT Walsheim Pro"', 'sans'],
		},
	  },
	},
	variants: {
	  // Some variants
	},
	plugins: [
	  // Some plugins
	],
  };
  