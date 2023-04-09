
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly'
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'prettier',
    'plugin:prettier/recommended'
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue',
    'prettier'
  ],
  'rules': {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'newline-per-chained-call': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    semi: ['error', 'never'],
    // 'comma-dangle': ['error', 'never'],
    quotes: [0, 'single'],
    'prettier/prettier': [0, 'single'],
    // trailingComma: ['error', 'never']
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ]
  }
}