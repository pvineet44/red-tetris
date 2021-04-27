/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
    preset: 'ts-jest',
      clearMocks: true,
      collectCoverage: true,
      coverageDirectory: "coverage",
      coverageProvider: "v8",
      moduleNameMapper: {
        "@exmpl/(.*)": "<rootDir>/src/$1"
      },    
      // An object that configures minimum threshold enforcement for coverage results
      coverageThreshold: {
        global: {
            branches: 50,
            functions: 70,
            lines: 70,
            statements: 70,
        },
      },
      // The test environment that will be used for testing
      testEnvironment: "node",
    };
    