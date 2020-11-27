import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';
import { shallow } from "enzyme";

test("App renders without crashing", () => {
  shallow(<App />);
});

test('Welcome Page shows up', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to/i);
  expect(linkElement).toBeInTheDocument();
});

test('Login Page shows up when going to /dashboard', () => {
  window.history.pushState({}, 'Dashboard', '/dashboard');
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/Log in/i);
  expect(linkElement[0]).toBeInTheDocument();
});

test('Dashboard Page shows up when logged in', () => {
  window.history.pushState({}, 'Dashboard', '/');
  sessionStorage.setItem('isLoggedIn', true);
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});

test('Dashboard Page shows up when logged in and going to /register', () => {
  sessionStorage.setItem('isLoggedIn', true);
  window.history.pushState({}, 'RegistrationForm', '/register');
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});

test('Dashboard Page shows up when logged in and going to /login', () => {
  sessionStorage.setItem('isLoggedIn', true);
  window.history.pushState({}, 'LoginForm', '/login');
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});