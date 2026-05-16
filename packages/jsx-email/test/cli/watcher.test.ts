import { EventEmitter } from 'node:events';
import { access, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { BuildTempatesResult } from '../../src/cli/commands/build.js';

const mocks = vi.hoisted(() => ({
  buildForPreview: vi.fn(),
  originalCwd: '/repo',
  subscriptions: [] as Array<{ unsubscribe: ReturnType<typeof vi.fn> }>,
  subscribe: vi.fn(),
  writePreviewDataFiles: vi.fn()
}));

vi.mock('@parcel/watcher', () => ({
  subscribe: mocks.subscribe
}));

vi.mock('../../src/cli/helpers.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/cli/helpers.js')>();

  return {
    ...actual,
    buildForPreview: mocks.buildForPreview,
    originalCwd: mocks.originalCwd,
    writePreviewDataFiles: mocks.writePreviewDataFiles
  };
});

import {
  getParcelWatcherOptions,
  isChildPath,
  isNodeModulePath,
  normalizeWatcherPath,
  removeDeletedFile,
  watch
} from '../../src/cli/watcher.js';

const fileExists = (path: string) =>
  access(path).then(
    () => true,
    () => false
  );
const createSubscription = () => {
  const subscription = { unsubscribe: vi.fn() };
  mocks.subscriptions.push(subscription);

  return subscription;
};
const repoPath = (...parts: string[]) => resolve(mocks.originalCwd, ...parts);
const createMetaFile = async (
  tempDir: string,
  name: string,
  entryPoint: string,
  inputs: string[]
) => {
  const metaPath = join(tempDir, `${name}.meta.json`);

  await writeFile(
    metaPath,
    JSON.stringify({
      outputs: {
        [`${name}.js`]: {
          entryPoint,
          inputs: Object.fromEntries(inputs.map((input) => [input, {}]))
        }
      }
    }),
    'utf8'
  );

  return metaPath;
};
const createBuildResult = ({
  compiledPath = '/preview/base.js',
  fileName,
  metaPath,
  templateName = 'Base',
  writePathBase = '/preview/base'
}: {
  compiledPath?: string;
  fileName: string;
  metaPath?: string;
  templateName?: string;
  writePathBase?: string;
}): BuildTempatesResult => ({
  compiledPath,
  fileName,
  html: '',
  metaPath,
  plainText: '',
  sourceFile: fileName,
  templateName,
  writePathBase
});
const createWatchArgs = (files: BuildTempatesResult[]) => {
  const httpServer = new EventEmitter();

  return {
    common: {
      argv: {
        exclude: []
      }
    },
    files,
    httpServer,
    server: {
      httpServer
    }
  };
};
const captureWatcherHandler = () => {
  let handler: Parameters<typeof mocks.subscribe>[1] | undefined;

  mocks.subscribe.mockImplementation(async (_, callback) => {
    handler = callback;
    return createSubscription();
  });

  return () => handler;
};

beforeEach(() => {
  mocks.buildForPreview.mockReset();
  mocks.subscribe.mockReset();
  mocks.subscriptions.length = 0;
  mocks.writePreviewDataFiles.mockReset();

  mocks.subscribe.mockImplementation(async () => createSubscription());
  mocks.buildForPreview.mockResolvedValue([]);
  mocks.writePreviewDataFiles.mockResolvedValue(undefined);
});

describe('watcher path helpers', () => {
  it('uses the native Windows parcel watcher backend on Windows', () => {
    expect(getParcelWatcherOptions('win32')).toEqual({ backend: 'windows' });
  });

  it('does not force a parcel watcher backend on non-Windows platforms', () => {
    expect(getParcelWatcherOptions('darwin')).toBeUndefined();
    expect(getParcelWatcherOptions('linux')).toBeUndefined();
  });

  it('detects POSIX node_modules paths', () => {
    expect(isNodeModulePath('/repo/node_modules/pkg/file.js')).toBe(true);
  });

  it('detects Windows node_modules paths', () => {
    expect(isNodeModulePath('C:\\repo\\node_modules\\pkg\\file.js')).toBe(true);
  });

  it('does not match node_modules as part of another path segment', () => {
    expect(isNodeModulePath('/repo/not_node_modules/pkg/file.js')).toBe(false);
  });

  it('normalizes Windows drive paths for watcher lookups', () => {
    expect(normalizeWatcherPath('C:\\Repo\\Templates\\Base.tsx')).toBe(
      'c:/repo/templates/base.tsx'
    );
  });

  it('normalizes Windows UNC paths for watcher lookups', () => {
    expect(normalizeWatcherPath('\\\\Server\\Share\\Templates\\Base.tsx')).toBe(
      '//server/share/templates/base.tsx'
    );
  });

  it('preserves POSIX path casing for watcher lookups', () => {
    expect(normalizeWatcherPath('/Repo/Templates/Base.tsx')).toBe('/Repo/Templates/Base.tsx');
  });

  it('detects child paths', () => {
    expect(isChildPath('/repo/templates', '/repo/templates/nested')).toBe(true);
  });

  it('does not treat sibling directories that start with two dots as child paths', () => {
    expect(isChildPath('/repo/templates', '/repo/..templates')).toBe(false);
  });

  it('does not treat Windows cross-drive paths as child paths', () => {
    expect(isChildPath('C:\\repo\\templates', 'D:\\repo\\templates\\nested')).toBe(false);
  });

  it('removes deleted files by normalized watcher path and cleans artifacts', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));
    const compiledPath = join(tempDir, 'base.js');
    const writePathBase = join(tempDir, 'preview-base');
    const previewDataPath = `${writePathBase}.js`;
    const fileName = 'C:\\Repo\\Templates\\Base.tsx';
    const files = [
      {
        compiledPath,
        fileName,
        html: '',
        plainText: '',
        sourceFile: fileName,
        templateName: 'Base',
        writePathBase
      }
    ] satisfies BuildTempatesResult[];
    const validFiles = [normalizeWatcherPath(fileName)];

    await writeFile(compiledPath, '');
    await writeFile(previewDataPath, '');

    try {
      await expect(
        removeDeletedFile({
          files,
          path: 'c:/repo/templates/base.tsx',
          validFiles
        })
      ).resolves.toBe(true);

      expect(files).toEqual([]);
      expect(validFiles).toEqual([]);
      await expect(fileExists(compiledPath)).resolves.toBe(false);
      await expect(fileExists(previewDataPath)).resolves.toBe(false);
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });
});

describe('watcher integration', () => {
  it('subscribes to deduped parent directories and excludes node_modules dependencies', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const templatesDir = dirname(baseTemplate);
      const metaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx',
        'templates/components/button.tsx',
        'templates/nested/component.tsx',
        'node_modules/pkg/index.js'
      ]);
      const args = createWatchArgs([createBuildResult({ fileName: baseTemplate, metaPath })]);

      await watch(args);

      expect(mocks.subscribe).toHaveBeenCalledTimes(1);
      expect(mocks.subscribe).toHaveBeenCalledWith(
        templatesDir,
        expect.any(Function),
        getParcelWatcherOptions()
      );
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('subscribes when build metadata paths are file URLs', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const templatesDir = dirname(baseTemplate);
      const metaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const args = createWatchArgs([
        createBuildResult({
          fileName: baseTemplate,
          metaPath: pathToFileURL(metaPath).toString()
        })
      ]);

      await watch(args);

      expect(mocks.subscribe).toHaveBeenCalledTimes(1);
      expect(mocks.subscribe).toHaveBeenCalledWith(
        templatesDir,
        expect.any(Function),
        getParcelWatcherOptions()
      );
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('unsubscribes every parcel watcher subscription when the Vite server closes', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const accountTemplate = repoPath('account/email.tsx');
      const baseMetaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const accountMetaPath = await createMetaFile(tempDir, 'account', 'account/email.tsx', [
        'account/email.tsx'
      ]);
      const args = createWatchArgs([
        createBuildResult({ fileName: baseTemplate, metaPath: baseMetaPath }),
        createBuildResult({
          fileName: accountTemplate,
          metaPath: accountMetaPath,
          templateName: 'Account',
          writePathBase: repoPath('preview/account')
        })
      ]);

      await watch(args);
      args.httpServer.emit('close');

      expect(mocks.subscriptions).toHaveLength(2);
      expect(mocks.subscriptions.map(({ unsubscribe }) => unsubscribe.mock.calls.length)).toEqual([
        1, 1
      ]);
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('rebuilds the owning template when a tracked dependency updates', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const buttonComponent = repoPath('templates/components/button.tsx');
      const metaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx',
        'templates/components/button.tsx'
      ]);
      const args = createWatchArgs([createBuildResult({ fileName: baseTemplate, metaPath })]);

      const getHandler = captureWatcherHandler();

      await watch(args);
      await getHandler()?.(null, [{ path: buttonComponent, type: 'update' }]);

      expect(mocks.buildForPreview).toHaveBeenCalledWith({
        buildPath: expect.stringContaining('preview'),
        exclude: [],
        quiet: true,
        targetPath: baseTemplate
      });
      expect(mocks.writePreviewDataFiles).toHaveBeenCalledWith([]);
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('ignores untracked updates, node_modules events, and unsupported extensions', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const metaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const args = createWatchArgs([createBuildResult({ fileName: baseTemplate, metaPath })]);

      const getHandler = captureWatcherHandler();

      await watch(args);
      await getHandler()?.(null, [
        { path: repoPath('templates/readme.md'), type: 'update' },
        { path: repoPath('templates/other.tsx'), type: 'update' },
        { path: repoPath('node_modules/pkg/index.ts'), type: 'update' }
      ]);

      expect(mocks.buildForPreview).not.toHaveBeenCalled();
      expect(mocks.writePreviewDataFiles).not.toHaveBeenCalled();
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('builds created template files and tracks their dependency paths', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const createdTemplate = repoPath('templates/new.tsx');
      const createdButton = repoPath('templates/components/new-button.tsx');
      const baseMetaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const createdMetaPath = await createMetaFile(tempDir, 'created', 'templates/new.tsx', [
        'templates/new.tsx',
        'templates/components/new-button.tsx'
      ]);
      const createdResult = createBuildResult({
        fileName: createdTemplate,
        metaPath: createdMetaPath,
        templateName: 'New',
        writePathBase: repoPath('preview/new')
      });
      const args = createWatchArgs([
        createBuildResult({ fileName: baseTemplate, metaPath: baseMetaPath })
      ]);

      const getHandler = captureWatcherHandler();
      mocks.buildForPreview.mockResolvedValueOnce([createdResult]).mockResolvedValueOnce([]);

      await watch(args);
      await getHandler()?.(null, [{ path: createdTemplate, type: 'create' }]);
      await getHandler()?.(null, [{ path: createdButton, type: 'update' }]);

      expect(mocks.buildForPreview).toHaveBeenNthCalledWith(1, {
        buildPath: expect.stringContaining('preview'),
        exclude: [],
        quiet: true,
        targetPath: createdTemplate
      });
      expect(mocks.buildForPreview).toHaveBeenNthCalledWith(2, {
        buildPath: expect.stringContaining('preview'),
        exclude: [],
        quiet: true,
        targetPath: createdTemplate
      });
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('handles duplicate Windows update events without rebuilding unrelated templates', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const accountTemplate = repoPath('account/email.tsx');
      const baseMetaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const accountMetaPath = await createMetaFile(tempDir, 'account', 'account/email.tsx', [
        'account/email.tsx'
      ]);
      const args = createWatchArgs([
        createBuildResult({ fileName: baseTemplate, metaPath: baseMetaPath }),
        createBuildResult({
          fileName: accountTemplate,
          metaPath: accountMetaPath,
          templateName: 'Account',
          writePathBase: repoPath('preview/account')
        })
      ]);

      const getHandler = captureWatcherHandler();

      await watch(args);
      await getHandler()?.(null, [
        { path: baseTemplate, type: 'update' },
        { path: baseTemplate, type: 'update' }
      ]);

      expect(mocks.buildForPreview).toHaveBeenCalledTimes(2);
      expect(mocks.buildForPreview).toHaveBeenCalledWith(
        expect.objectContaining({ targetPath: baseTemplate })
      );
      expect(mocks.buildForPreview).not.toHaveBeenCalledWith(
        expect.objectContaining({ targetPath: accountTemplate })
      );
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('removes deleted tracked files and compiled preview artifacts through the watcher handler', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));
    const compiledPath = join(tempDir, 'base.js');
    const writePathBase = join(tempDir, 'preview-base');
    const previewDataPath = `${writePathBase}.js`;

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const metaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const args = createWatchArgs([
        createBuildResult({
          compiledPath,
          fileName: baseTemplate,
          metaPath,
          writePathBase
        })
      ]);
      const getHandler = captureWatcherHandler();

      await writeFile(compiledPath, 'compiled', 'utf8');
      await writeFile(previewDataPath, 'preview', 'utf8');

      await watch(args);
      await getHandler()?.(null, [{ path: baseTemplate, type: 'delete' }]);
      await getHandler()?.(null, [{ path: baseTemplate, type: 'update' }]);

      expect(args.files).toEqual([]);
      await expect(fileExists(compiledPath)).resolves.toBe(false);
      await expect(fileExists(previewDataPath)).resolves.toBe(false);
      expect(mocks.buildForPreview).not.toHaveBeenCalled();
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });

  it('does not process events when parcel watcher reports an error', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));

    try {
      const baseTemplate = repoPath('templates/base.tsx');
      const metaPath = await createMetaFile(tempDir, 'base', 'templates/base.tsx', [
        'templates/base.tsx'
      ]);
      const args = createWatchArgs([createBuildResult({ fileName: baseTemplate, metaPath })]);
      const getHandler = captureWatcherHandler();

      await watch(args);
      await getHandler()?.(new Error('watcher failed'), []);

      expect(mocks.buildForPreview).not.toHaveBeenCalled();
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });
});
