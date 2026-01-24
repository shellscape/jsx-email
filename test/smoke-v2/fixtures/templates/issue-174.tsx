// Note: This tests the fix for https://github.com/shellscape/jsx-email/issues/174

import { Html, Tailwind } from 'jsx-email';
// @ts-ignore
import { definePreset, presetUno } from 'unocss';

export const preset = definePreset(() => {
  return {
    presets: [presetUno()]
  };
});

export const templateName = 'Issue174';

export const Template = () => (
  <Tailwind config={{ presets: [preset] }}>
    <Html></Html>
  </Tailwind>
);
