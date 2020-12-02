import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from "enzyme";

test("App renders without crashing", () => {
  shallow(<App />);
});

test('Welcome Page shows up', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Don't have an account?/i);
  expect(linkElement).toBeInTheDocument();
});

test('Login Page shows up when going to /dashboard', () => {
  window.history.pushState({}, 'Dashboard', '/dashboard');
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/Log in/i);
  expect(linkElement[0]).toBeInTheDocument();
});