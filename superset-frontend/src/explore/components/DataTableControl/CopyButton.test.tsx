//before
import React from 'react';
import { render, screen } from 'spec/helpers/testing-library';

import { CopyButton } from '.';

test('Render a button', () => {
  render(<CopyButton>btn</CopyButton>);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveClass('superset-button');
});

//after
import React from 'react';
import { createRoot } from 'react-dom/client';
import { screen } from 'spec/helpers/testing-library';

import { CopyButton } from '.';

test('Render a button', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<CopyButton>btn</CopyButton>);
  document.body.appendChild(container);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveClass('superset-button');
});