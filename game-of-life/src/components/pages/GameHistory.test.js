import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import GameHistory from './GameHistory';
import { shallow } from "enzyme";

test("GameHistory renders without crashing", () => {
  shallow(<GameHistory />);
});

test('Render GameHistory', () => {
  const { getByText } = render(<GameHistory />);
  const linkElement = getByText(/Game History/i);
  expect(linkElement).toBeInTheDocument();
});

it('GameHistory renders correctly', () => {
  const tree = renderer
    .create(<GameHistory />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});