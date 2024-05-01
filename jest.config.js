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
};

export default config;
