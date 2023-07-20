//after
import { TimeFormats } from '@superset-ui/core';
import React from 'react';
import { createRoot, screen } from 'spec/helpers/testing-library';
import TimeCell from '.';

const DATE = Date.parse('2022-01-01');

test('renders with default format', async () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<TimeCell value={DATE} />);
  expect(screen.getByText('2022-01-01 00:00:00')).toBeInTheDocument();
});

test('renders with custom format', async () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<TimeCell value={DATE} format={TimeFormats.DATABASE_DATE} />);
  expect(screen.getByText('2022-01-01')).toBeInTheDocument();
});

test('renders with number', async () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<TimeCell value={DATE.valueOf()} />);
  expect(screen.getByText('2022-01-01 00:00:00')).toBeInTheDocument();
});

test('renders with no value', async () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<TimeCell />);
  expect(screen.getByText('N/A')).toBeInTheDocument();
});

test('renders with invalid date format', async () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<TimeCell format="aaa-bbb-ccc" value={DATE} />);
  expect(screen.getByText('aaa-bbb-ccc')).toBeInTheDocument();
});