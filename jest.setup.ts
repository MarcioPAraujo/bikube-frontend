/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios) so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
