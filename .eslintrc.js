module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
    ],
    rules: {
      // Add specific ESLint rules here
      'vue/no-ref-as-operand': 'off',
    },
    globals: {
        ref: 'readonly', // Define ref as a global variable
        reactive: 'readonly', // Define reactive as a global variable
        computed: 'readonly', // Define computed as a global variable
        // Add other Vue 3 Composition API functions as needed
      },
  };
  