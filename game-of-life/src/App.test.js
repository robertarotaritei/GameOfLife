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
  const linkElement = getByText(/Welcome to the Game of Life/i);
  expect(linkElement).toBeInTheDocument();
});

it('App renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});