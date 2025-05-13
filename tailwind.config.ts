import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '0.5rem',
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff'
        },
      }
    }
  },
  plugins: []
}

export default config
