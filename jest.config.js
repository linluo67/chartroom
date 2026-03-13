const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(element-ui|@vue)/)'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
};
