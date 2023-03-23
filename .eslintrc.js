module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: `@typescript-eslint/parser`, // 将解析器从`babel-eslint`替换成`@typescript-eslint/parser`,用以解析 TS 代码
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  extends: [
    `eslint:recommended`,
    `plugin:@typescript-eslint/recommended`, // 使用 @typescript-eslint/eslint-plugin 推荐配置
    `plugin:react/recommended`,
    `plugin:react-hooks/recommended`,
    `plugin:prettier/recommended`, // 使用 prettier 中的样式规范，且如果使用 ESLint 会检测 prettier 的格式问题，同样将格式问题以 error 的形式抛出
  ],
  plugins: [
    `import`,
    `@typescript-eslint`, // 处理 TS 语法规则
    `react`,
    `react-hooks`,
    `filenames`,
  ],
  globals: {
    graphql: false,
  },
  rules: {
    // import
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'import/first': 'error',
    'import/no-mutable-exports': 'warn',

    // react
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
