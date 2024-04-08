import { defineConfig } from '../../src/config';

describe('render', async () => {
  test('defaults', async () => {
    expect(await defineConfig({})).toMatchSnapshot();
  });

  test('basic set', async () => {
    const config = await defineConfig({
      render: {
        minify: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('minify and pretty', async () => {
    const config = await defineConfig({
      render: {
        minify: true,
        pretty: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('plain', async () => {
    const config = await defineConfig({
      render: {
        minify: true,
        plainText: true,
        pretty: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('plain', async () => {
    const config = await defineConfig({
      render: {
        minify: true,
        plainText: true,
        pretty: true
      }
    });
    expect(config).toMatchSnapshot();
  });
});
