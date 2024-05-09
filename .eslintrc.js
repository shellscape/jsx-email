module.exports = {
  extends: ['shellscape/typescript', 'plugin:import/typescript'],
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'no-underscore-dangle': 'off',
        'spaced-comment': 'off'
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off',
        'no-undef': 'off'
      }
    },
    {
      files: ['**/scripts/**', '**/test/**'],
      rules: {
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'no-console': 'off'
      }
    },
    {
      files: ['apps/demo/emails/**/*.tsx', 'apps/demo/staged/**/*.tsx'],
      rules: {
        'arrow-body-style': 'off',
        'no-use-before-define': 'off',
        'sort-keys': 'off',
        'typescript-sort-keys/interface': 'off'
      }
    }
  ],
  parserOptions: {
    project: ['./shared/tsconfig.eslint.json', './packages/**/tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'local',
        varsIgnorePattern: '^_'
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        cjs: 'never',
        cts: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        mts: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-console': 'error'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.cjs', '.js', '.json', '.jsx', '.mjs', '.ts', '.tsx']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};
