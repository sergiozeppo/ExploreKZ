/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // Collect files for testing
    collectCoverageFrom: ['src/**/*.tsx', '!**/node_modules/**'],

    // Resolve Mapper for files Jest can't parse for testing
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/__mocks__/fileMock.ts',
        '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.ts',
    },
};

export default config;
