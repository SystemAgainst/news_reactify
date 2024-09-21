import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  js.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        // Глобальные переменные браузера
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URLSearchParams: 'readonly',
        // Глобальные переменные Node.js
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect', // Автоматически определяет версию React
      },
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: 2,
      quotes: ['error', 'single'],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'state',
            'acc',
            'e',
            'config',
            'requestConfig',
          ],
        },
      ],
      'func-names': ['warn', 'as-needed'],
      'no-shadow': ['error', { allow: ['state'] }],
      'max-len': [
        'error',
        {
          code: 130,
          tabWidth: 2,
          ignorePattern: '',
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'react/jsx-max-props-per-line': [
        'error',
        { maximum: 1, when: 'multiline' },
      ],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  ...compat.config({ extends: ['plugin:react/recommended'] }),
];
