module.exports = {
  globals: {
    ENV_CONFIG: 'readonly',
    web3: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/camelcase': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'consistent-return': 0,
    'max-len': 0,
    'react-pug/prop-types': 0,
    'object-curly-newline': 0,
    'react/destructuring-assignment': 0,
    'linebreak-style': [0, 'error', 'windows'],
    'no-new': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'global-require': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-console': 0,
  },
}
