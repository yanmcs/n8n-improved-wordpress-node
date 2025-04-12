/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Look for test files in __tests__ directories
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
