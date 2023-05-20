


/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },  
  //preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir:'/home/test-carka/',
  moduleDirectories: ['node_modules', 'src'],
};

module.exports = config;