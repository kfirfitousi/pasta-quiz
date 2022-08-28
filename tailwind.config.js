/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
