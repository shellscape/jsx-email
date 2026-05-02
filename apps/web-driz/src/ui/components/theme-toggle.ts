import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const themeCycle = ['light', 'dark', 'system'] as const;

type ThemePreference = (typeof themeCycle)[number];

const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system';

const formatThemeLabel = (theme: ThemePreference) =>
  `Switch to ${theme[0].toUpperCase()}${theme.slice(1)} Mode`;

const getStoredTheme = (): ThemePreference => {
  const storedTheme = localStorage.getItem('theme') || localStorage.getItem('starlight-theme');
  const normalizedTheme = storedTheme === 'auto' ? 'system' : storedTheme;

  return isThemePreference(normalizedTheme) ? normalizedTheme : 'system';
};

const getResolvedTheme = (theme: ThemePreference) => {
  if (theme === 'system') {
    return prefersDarkQuery.matches ? 'dark' : 'light';
  }

  return theme;
};

const getNextTheme = (theme: ThemePreference) =>
  themeCycle[(themeCycle.indexOf(theme) + 1) % themeCycle.length];

const applyTheme = (theme: ThemePreference) => {
  const resolvedTheme = getResolvedTheme(theme);

  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  document.documentElement.classList.toggle('light', resolvedTheme !== 'dark');
  document.documentElement.style.colorScheme = resolvedTheme;
};

const updateThemeToggle = (
  themeToggle: HTMLElement,
  tooltip: Instance,
  theme = getStoredTheme()
) => {
  const nextTheme = getNextTheme(theme);
  const label = formatThemeLabel(nextTheme);

  themeToggle.setAttribute('aria-label', label);
  tooltip.setContent(label);

  document.querySelectorAll('[data-theme-toggle-icon]').forEach((icon) => {
    icon.classList.toggle('hidden', icon.getAttribute('data-theme-toggle-icon') !== nextTheme);
  });
};

const setHomepageTheme = (themeToggle: HTMLElement, tooltip: Instance, theme: ThemePreference) => {
  localStorage.setItem('theme', theme);
  localStorage.setItem('starlight-theme', theme);
  applyTheme(theme);
  updateThemeToggle(themeToggle, tooltip, theme);
};

export const initHomepageThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const tooltip = tippy(themeToggle, {
    arrow: false,
    content: '',
    hideOnClick: true,
    offset: [0, 8],
    placement: 'bottom',
    theme: 'jsx-email',
    trigger: 'mouseenter focus'
  });

  themeToggle.addEventListener('click', () => {
    setHomepageTheme(themeToggle, tooltip, getNextTheme(getStoredTheme()));
    tooltip.hide();
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'starlight-theme' || event.key === 'theme') {
      const newTheme = event.newValue === 'auto' ? 'system' : event.newValue;
      const theme = isThemePreference(newTheme) ? newTheme : 'system';
      applyTheme(theme);
      updateThemeToggle(themeToggle, tooltip, theme);
    }
  });

  prefersDarkQuery.addEventListener('change', () => {
    if (getStoredTheme() === 'system') {
      applyTheme('system');
      updateThemeToggle(themeToggle, tooltip, 'system');
    }
  });

  applyTheme(getStoredTheme());
  updateThemeToggle(themeToggle, tooltip);
};
