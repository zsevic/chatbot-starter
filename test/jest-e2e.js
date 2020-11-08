const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions: { paths: tsconfigPaths } } = require('../tsconfig');

module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>/' }),
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
