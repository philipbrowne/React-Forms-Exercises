import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BoxList from './BoxList';

it('renders without crashing', () => {
  render(<BoxList />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it('should add new item', () => {
  const { queryByText, getByLabelText, getAllByRole } = render(<BoxList />);
  expect(queryByText('Width: 300 pixels')).not.toBeInTheDocument();
  const widthInput = getByLabelText('Width: 0 pixels');
  const heightInput = getByLabelText('Height: 0 pixels');
  const btn = queryByText('Add Box');
  fireEvent.change(widthInput, { target: { value: '250' } });
  fireEvent.change(heightInput, { target: { value: '250' } });
  fireEvent.click(btn);
  const boxes = getAllByRole('figure');
  expect(boxes.length).toBe(3);
});
