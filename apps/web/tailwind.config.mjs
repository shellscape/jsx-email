import cssFade from 'css-fade/tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Onest', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        'docs-bg': 'var(--bg)',
        'docs-surface': 'var(--surface)',
        'docs-surface-raised': 'var(--surface-raised)',
        'docs-border': 'var(--border)',
        'docs-border-soft': 'var(--border-soft)',
        'docs-text': 'var(--text)',
        'docs-text-subtle': 'var(--text-subtle)',
        'docs-text-strong': 'var(--text-strong)',
        'docs-brand': 'var(--brand)'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius)',
        md: 'var(--radius)',
        lg: 'var(--radius)',
        xl: 'var(--radius)',
        '2xl': 'var(--radius)',
        '3xl': 'var(--radius)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [cssFade]
};
