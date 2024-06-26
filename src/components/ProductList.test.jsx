import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProduct from '../pages/AddProduct';

test('renders AddProduct component', () => {
  render(<AddProduct />);
  expect(screen.getByText(/add product/i)).toBeInTheDocument();
});

test('renders form inputs and buttons', () => {
  render(<AddProduct />);
  
  expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
});

test('clear button clears the input fields', () => {
  render(<AddProduct />);
  
  const nameInput = screen.getByLabelText(/product name/i);
  const priceInput = screen.getByLabelText(/price/i);
  const clearButton = screen.getByRole('button', { name: /clear/i });

  fireEvent.change(nameInput, { target: { value: 'Test Product' } });
  fireEvent.change(priceInput, { target: { value: '100' } });

  fireEvent.click(clearButton);

  expect(nameInput.value).toBe('');
  expect(priceInput.value).toBe('');
});
