import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import RegistrationForm from './RegistrationForm';
import { shallow } from "enzyme";

test("RegistrationForm renders without crashing", () => {
  shallow(<RegistrationForm />);
});

test('Render RegistrationForm Text', () => {
  const { getByText } = render(<RegistrationForm />);
  const linkElement = getByText(/Already have an account/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render RegistrationForm Log in Button', () => {
  const { getByText } = render(<RegistrationForm />);
  const linkElement = getByText(/Log in/i);
  expect(linkElement).toBeInTheDocument();
});

it('RegistrationForm renders correctly', () => {
  const tree = renderer
    .create(<RegistrationForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});