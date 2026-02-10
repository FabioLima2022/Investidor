/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D084', // Verde crescimento
          50: '#E6FAF3',
          100: '#CCF5E7',
          500: '#00D084',
          600: '#00A66A',
          700: '#007D50',
        },
        secondary: {
          DEFAULT: '#1E3A8A', // Azul confiança
          50: '#E8ECF3',
          100: '#D2DAE8',
          500: '#1E3A8A',
          600: '#182E6E',
          700: '#122353',
        },
        neutral: {
          DEFAULT: '#6B7280',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          800: '#1F2937',
          900: '#111827',
        },
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      }
    },
  },
  plugins: [],
}
