/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { min: '240px', max: '819px' },
        pc: { min: '1280px' },
        nPc: { max: '1279px' },
        // sm: { min: '641px', max: '819px' },
        md: { min: '820px', max: '1023px' },
        lg: { min: '1080px' },
      },
      spacing: {
        // 'my-page-max-width': '764px',
        'home-max-width': '1080px',
      },
    },
  },
  plugins: [],
};
