import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import GameMenu from './GameMenu';
import { shallow } from "enzyme";

test("GameMenu renders without crashing", () => {
  shallow(<GameMenu />);
});

test('Render GameMenu', () => {
  const { getByText } = render(<GameMenu playState={'play'}/>);
  const linkElement = getByText(/Play/i);
  expect(linkElement).toBeInTheDocument();
});

it('GameMenu renders correctly', () => {
  const tree = renderer
    .create(<GameMenu />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render GameMenu', () => {
  const { getByText } = render(<GameMenu playState={'resume'}/>);
  const linkElement = getByText(/Resume/i);
  expect(linkElement).toBeInTheDocument();
});