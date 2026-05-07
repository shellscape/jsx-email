import { describe, expect, it } from 'vitest';

import { buildFileTree } from '../../src/helpers/file-tree';
import type { TemplateData } from '../../src/types/templates';

const baseTemplate = {
  fileExtension: 'tsx',
  fileName: '',
  html: '',
  plain: '',
  source: '',
  sourceFile: '',
  sourcePath: '',
  templateName: ''
} satisfies Omit<TemplateData, 'id' | 'name' | 'path'>;

describe('buildFileTree', () => {
  it('groups nested template paths and sorts folders before files', () => {
    const tree = buildFileTree([
      { ...baseTemplate, fileName: 'alpha.tsx', id: 'a', path: 'alpha', templateName: 'alpha' },
      { ...baseTemplate, fileName: 'zeta.tsx', id: 'b', path: 'zeta/nested', templateName: 'nested' },
      { ...baseTemplate, fileName: 'deep.tsx', id: 'c', path: 'zeta/deeper/deep', templateName: 'deep' },
      { ...baseTemplate, fileName: 'beta.tsx', id: 'd', path: 'beta/root', templateName: 'root' },
      { ...baseTemplate, fileName: 'early.tsx', id: 'e', path: 'zeta/early', templateName: 'early' }
    ]);

    expect(tree.map((node) => node.name)).toEqual(['beta', 'zeta', 'alpha']);
    expect(tree[1]?.children?.map((node) => node.name)).toEqual(['deeper', 'early', 'nested']);
    expect(tree[1]?.children?.[0]?.children?.[0]).toMatchObject({
      name: 'deep',
      template: { id: 'c' }
    });
  });
});
