// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './test/server.js';

const originalLocation = window.location;

const mockLocationAssign = () => {
  delete window.location;

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(originalLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  );
};

const restoreWindowLocation = () => {
  window.location = originalLocation;
};

beforeAll(() => {
  mockLocationAssign();
  server.listen();
});
beforeEach(() => server.resetHandlers());
afterAll(() => {
  restoreWindowLocation();
  server.close();
});
