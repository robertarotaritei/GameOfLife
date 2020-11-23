import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar';
import renderer from 'react-test-renderer';
import { shallow } from "enzyme";

it('NavigationBar clicks', () => {
  const {getByTestId} = render(<NavigationBar />);
  let button = getByTestId('logOut');
  fireEvent.click(button);
});

test("NavigationBar renders without crashing", () => {
  shallow(<NavigationBar />);
});

it('NavigationBar renders correctly', () => {
  const tree = renderer
    .create(<NavigationBar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render NavigationBar Log out Button', () => {
  const { getByText } = render(<NavigationBar />);
  const linkElement = getByText(/Log out/i);
  expect(linkElement).toBeInTheDocument();
});
