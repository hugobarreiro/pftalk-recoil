module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    '@react-native-community',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'comma-dangle': [1, 'never'],
        quotes: [1, 'double'],
        semi: [1, 'never'],
      },
    },
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'prettier',
    'react-hooks',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        selector: 'parameter',
      },
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        modifiers: ['private'],
        selector: 'memberLike',
      },
      {
        format: ['PascalCase'],
        selector: 'typeLike',
      },
      {
        custom: {
          match: true,
          regex: '^I[A-Z]',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
      {
        format: ['camelCase', 'PascalCase'],
        selector: 'enumMember',
      },
    ],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-var-requires': ['off'],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['index', 'sibling', 'parent', 'object'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react+(|-native)',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    indent: ['off'],
    'jsonc/sort-keys': 'error',
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-dupe-class-members': ['off'],
    'no-empty': [1, { allowEmptyCatch: true }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*'],
            message: 'Use only absolute imports',
          },
          {
            group: [
              'core/*',
              '!@audacy-clients/core',
              '!@audacy-clients/client-services/core',
              '!@react-navigation/core',
            ],
            message: 'Use @audacy-clients/core for core imports',
          },
        ],
      },
    ],
    'no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'ignore', props: 'always' },
    ],
    'react/jsx-no-literals': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: false,
        shorthandLast: true,
      },
    ],
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, minKeys: 5, natural: false },
    ],
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
    'import/ignore': ['react-native'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './',
      },
    },
  },
};
