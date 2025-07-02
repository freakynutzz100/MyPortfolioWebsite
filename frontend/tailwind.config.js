/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    light: '#3B82F6', // Blue for light mode
                    dark: '#60A5FA',  // Lighter blue for dark mode
                },
                maroon: {
                    600: '#8B0000',
                    700: '#800000',
                    800: '#660000',
                },
                background: {
                    light: '#FFFFFF',
                    dark: '#111827',  // Dark gray for dark mode
                },
                text: {
                    light: '#1F2937',
                    dark: '#F9FAFB',
                },
            },
        },
    },
    plugins: [
        function({ addUtilities }) {
            const glowUtilities = {
              '.glow-green-500': {
                '--tw-glow-shadow': '0 0 8px rgba(34, 197, 94, 0.6)',
              },
              '.glow-gray-400': {
                '--tw-glow-shadow': '0 0 8px rgba(156, 163, 175, 0.6)',
              },
              '.glow-blue-400': {
                '--tw-glow-shadow': '0 0 8px rgba(96, 165, 250, 0.6)',
              },
              '.glow-green-600': {
                '--tw-glow-shadow': '0 0 8px rgba(22, 163, 74, 0.6)',
              },
            };
            addUtilities(glowUtilities);
          },
    ],
} 