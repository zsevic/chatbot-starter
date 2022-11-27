const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions: { paths: tsconfigPaths } } = require('../tsconfig');

module.exports = {
  moduleDirectories: ['<rootDir>/../src', 'node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>/' }),
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
