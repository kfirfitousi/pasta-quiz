/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './features/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './pages/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ['Cookie', 'cursive'],
                sans: ['Sanchez', 'sans-serif']
            }
        }
    },
    plugins: []
};
