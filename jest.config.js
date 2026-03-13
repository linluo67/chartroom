module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    'src/view/**/*.{js,vue}',
    '!**/node_modules/**'
  ]
};
