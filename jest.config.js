module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest'
  }
};
