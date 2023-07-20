//after
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createRoot, screen, waitFor } from 'spec/helpers/testing-library';
import { CopyToClipboardButton } from '.';

test('Render a button', () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<CopyToClipboardButton data={{ copy: 'data', data: 'copy' }} />, {
    useRedux: true,
  });
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Should copy to clipboard', async () => {
  const callback = jest.fn();
  document.execCommand = callback;

  const originalClipboard = { ...global.navigator.clipboard };
  // @ts-ignore
  global.navigator.clipboard = { write: callback, writeText: callback };

  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<CopyToClipboardButton data={{ copy: 'data', data: 'copy' }} />, {
    useRedux: true,
  });

  expect(callback).toHaveBeenCalledTimes(0);
  userEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(callback).toHaveBeenCalled();
  });

  jest.resetAllMocks();
  // @ts-ignore
  global.navigator.clipboard = originalClipboard;
});