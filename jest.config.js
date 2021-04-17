module.exports = {
 
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  clearMocks: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
        branches: 50,
        functions: 70,
        lines: 70,
        statements: 70,
    },
  },

  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: [
  //   "@testing-library/react/cleanup-after-each",
  //   "@testing-library/jest-dom/extend-expect"
  // ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.js?$",

  // Module file extensions for importing
  moduleFileExtensions: ["jsx", "js"]
};