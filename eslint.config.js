import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  js.configs.recommended,
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URLSearchParams: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Автоматическое определение версии React
      },
    },
    rules: {
      // Общие правила форматирования
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'max-len': [
        'error',
        {
          code: 80, // Максимальная длина строки — 80 символов для улучшения читаемости
          tabWidth: 2,
          ignorePattern: '',
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],

      // React правила
      'react/jsx-max-props-per-line': [
        'error',
        { maximum: 1, when: 'multiline' }, // Один пропс на строку в многострочных компонентах
      ],
      'react/jsx-first-prop-new-line': ['error', 'multiline'], // Первый пропс на новой строке
      'react/jsx-indent': ['error', 2], // Отступ для JSX — 2 пробела
      'react/jsx-indent-props': ['error', 2], // Отступы для пропсов — 2 пробела
      'react/self-closing-comp': 'error', // Самозакрывающиеся компоненты без детей

      // React Hooks правила
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': ['error'], // Предупреждение об неиспользуемых переменных

      // Прочие правила
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
    },
  },
  ...compat.config({
    extends: ['plugin:react/recommended', 'prettier'], // Интеграция с Prettier для устранения конфликтов
  }),
];
