module.exports = {
  root: true,
  rules: {
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'master' ? 'error' : 'off'
  },
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ]
}
