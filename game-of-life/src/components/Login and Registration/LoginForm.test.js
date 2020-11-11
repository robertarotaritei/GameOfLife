import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoginForm from './LoginForm';
import { shallow } from "enzyme";

test("LoginForm renders without crashing", () => {
  shallow(<LoginForm />);
});

test('Render LoginForm', () => {
  const { getByText } = render(<LoginForm />);
  const linkElement = getByText(/Log in/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render LoginForm Text', () => {
  const { getByText } = render(<LoginForm />);
  const linkElement = getByText(/Don't have an account/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render LoginForm Register Button', () => {
  const { getByText } = render(<LoginForm />);
  const linkElement = getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});

it('LoginForm renders correctly', () => {
  const tree = renderer
    .create(<LoginForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});