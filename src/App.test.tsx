import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('home shows button Adicionar Curso', () => {
  render(<App />);
  const linkElement = screen.getByText("Adicionar Curso");
  expect(linkElement).toBeInTheDocument();
});
