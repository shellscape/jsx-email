import { win32 } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getRelativeOutputDir } from '../../src/cli/commands/build.js';

describe('cli build output path', () => {
  it('returns a nested relative path for Windows-style temp output paths', () => {
    const relativePath = getRelativeOutputDir({
      baseDir: 'C:\\Users\\batman\\AppData\\Local\\Temp\\jsx-email\\build\\src\\emails',
      outputBasePath: 'C:/Users/batman/AppData/Local/Temp/jsx-email/build',
      pathApi: win32
    });

    expect(relativePath).toBe('src\\emails');
  });

  it('returns null for different Windows drives', () => {
    const relativePath = getRelativeOutputDir({
      baseDir: 'D:\\Users\\batman\\AppData\\Local\\Temp\\jsx-email\\build\\src\\emails',
      outputBasePath: 'C:/Users/batman/AppData/Local/Temp/jsx-email/build',
      pathApi: win32
    });

    expect(relativePath).toBeNull();
  });

  it('returns null when the baseDir escapes the output base path', () => {
    const relativePath = getRelativeOutputDir({
      baseDir: 'C:\\Users\\batman\\other\\templates',
      outputBasePath: 'C:/Users/batman/AppData/Local/Temp/jsx-email/build',
      pathApi: win32
    });

    expect(relativePath).toBeNull();
  });

  it('allows child directories that start with two dots', () => {
    const relativePath = getRelativeOutputDir({
      baseDir: 'C:\\Users\\batman\\AppData\\Local\\Temp\\jsx-email\\build\\..templates',
      outputBasePath: 'C:/Users/batman/AppData/Local/Temp/jsx-email/build',
      pathApi: win32
    });

    expect(relativePath).toBe('..templates');
  });
});
