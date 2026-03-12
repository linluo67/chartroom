module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/tests/**/*.spec.js"],
  setupFiles: ["<rootDir>/tests/setup.js"],
  collectCoverageFrom: [
    "src/components/**/*.{js,vue}",
    "src/views/**/*.{js,vue}",
    "!**/node_modules/**"
  ],
  coverageReporters: ["text", "html"]
};
