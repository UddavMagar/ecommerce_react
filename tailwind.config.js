/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F97316',          
        hover: '#EA580C',   
        'secondary-text': '#9CA3AF',        
        background: '#FFF7ED',       
        card: '#FFFFFF',             
        text: '#1F2937',             
        // 'text-muted': '#6B7280',     
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}

