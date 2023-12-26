/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1B262C',
                secondary: '#0F4C75',
                accent: '#3282B8',
                background: '#BBE1FA',
                red: '#FF0000',
                green: '#00FF00',
                text: '#333333',
            },
            fontFamily: {
                sans: ['Helvetica', 'Arial', 'sans-serif'],
                serif: ['Georgia', 'serif'],
                mono: ['Menlo', 'monospace'],
            },
            spacing: {
                '2px': '2px',
                '3px': '3px',
                '4px': '4px',
                '5px': '5px',
                '8px': '8px',
                '16px': '16px',
                '24px': '24px',
                '32px': '32px',
            },
            borderRadius: {
                'extra': '1.5rem',
            },
            boxShadow: {
                'custom': '0 2px 4px rgba(0, 0, 0, 0.1)',
            },
            lineHeight: {
                '12': '3rem',
                '14': '3.5rem',
                '16': '4rem',
            },
        },
    },
    plugins: [],
}