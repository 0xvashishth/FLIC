import type { Config } from 'tailwindcss'

const config: Config = {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'sys-lightBlue': "#5ce1e6",
        'sys-pink': "#ff8bd2",
        'sys-yellow': "#ffde59",
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['monospace', 'ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'opun-black': ['var(--font-opun-black)'],
      'opun-medium': ['var(--font-opun-medium)'],
      'opun-light': ['var(--font-opun-light)'],
    },
  },
  plugins: [require("daisyui")],
}
export default config
