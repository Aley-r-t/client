module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'), // Asegúrate de tener estos plugins configurados correctamente
    require('autoprefixer')
  ],
}
