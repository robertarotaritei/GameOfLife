import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Game from './Game';
import { shallow } from "enzyme";

test("Game renders without crashing", () => {
  shallow(<Game />);
});

test('Render Game', () => {
  const { getByText } = render(<Game />);
  const linkElement = getByText(/Play/i);
  expect(linkElement).toBeInTheDocument();
});


it('Game renders correctly', () => {
  const tree = renderer
    .create(<Game />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});