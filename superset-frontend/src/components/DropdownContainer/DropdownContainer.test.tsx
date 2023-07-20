//after
import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from 'spec/helpers/testing-library';
import { createRoot } from 'react-dom/client';
import Button from '../Button';
import Icons from '../Icons';
import DropdownContainer from '.';

const generateItems = (n: number) =>
  Array.from({ length: n }).map((_, i) => ({
    id: `el-${i + 1}`,
    element: <Button>{`Element ${i + 1}`}</Button>,
  }));

const ITEMS = generateItems(10);

const mockOverflowingIndex = async (
  overflowingIndex: number,
  func: Function,
) => {
  const spy = jest.spyOn(React, 'useState');
  spy.mockImplementation(() => [overflowingIndex, jest.fn()]);
  await func();
  spy.mockRestore();
};

test('renders children', () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<DropdownContainer items={generateItems(3)} />);
  expect(screen.getByText('Element 1')).toBeInTheDocument();
  expect(screen.getByText('Element 2')).toBeInTheDocument();
  expect(screen.getByText('Element 3')).toBeInTheDocument();
});

test('renders children with custom horizontal spacing', () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<DropdownContainer items={ITEMS} style={{ gap: 20 }} />);
  expect(screen.getByTestId('container')).toHaveStyle('gap: 20px');
});

test('renders a dropdown trigger when overflowing', async () => {
  await mockOverflowingIndex(3, () => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<DropdownContainer items={ITEMS} />);
    expect(screen.getByText('More')).toBeInTheDocument();
  });
});

test('renders a dropdown trigger with custom icon', async () => {
  await mockOverflowingIndex(3, async () => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <DropdownContainer items={ITEMS} dropdownTriggerIcon={<Icons.Link />} />,
    );
    expect(
      await screen.findByRole('img', { name: 'link' }),
    ).toBeInTheDocument();
  });
});

test('renders a dropdown trigger with custom text', async () => {
  await mockOverflowingIndex(3, () => {
    const customText = 'Custom text';
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <DropdownContainer items={ITEMS} dropdownTriggerText={customText} />,
    );
    expect(screen.getByText(customText)).toBeInTheDocument();
  });
});

test('renders a dropdown trigger with custom count', async () => {
  await mockOverflowingIndex(3, () => {
    const customCount = 99;
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <DropdownContainer items={ITEMS} dropdownTriggerCount={customCount} />,
    );
    expect(screen.getByTitle(customCount)).toBeInTheDocument();
  });
});

test('does not render a dropdown button when not overflowing', () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<DropdownContainer items={generateItems(3)} />);
  expect(screen.queryByText('More')).not.toBeInTheDocument();
});

test('renders a dropdown when overflowing', async () => {
  await mockOverflowingIndex(3, () => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<DropdownContainer items={ITEMS} />);
    userEvent.click(screen.getByText('More'));
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();
  });
});

test('renders children with custom vertical spacing', async () => {
  await mockOverflowingIndex(3, () => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<DropdownContainer items={ITEMS} dropdownStyle={{ gap: 20 }} />);
    userEvent.click(screen.getByText('More'));
    expect(screen.getByTestId('dropdown-content')).toHaveStyle('gap: 20px');
  });
});

test('fires event when overflowing state changes', async () => {
  await mockOverflowingIndex(3, () => {
    const onOverflowingStateChange = jest.fn();
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <DropdownContainer
        items={generateItems(5)}
        onOverflowingStateChange={onOverflowingStateChange}
      />,
    );
    expect(onOverflowingStateChange).toHaveBeenCalledWith({
      notOverflowed: ['el-1', 'el-2', 'el-3'],
      overflowed: ['el-4', 'el-5'],
    });
  });
});

test('renders a dropdown with custom content', async () => {
  await mockOverflowingIndex(3, () => {
    const customDropdownContent = <div>Custom content</div>;
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <DropdownContainer
        items={ITEMS}
        dropdownContent={() => customDropdownContent}
      />,
    );
    userEvent.click(screen.getByText('More'));
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });
});

test('Shows tooltip on dropdown trigger hover', async () => {
  await mockOverflowingIndex(3, async () => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <DropdownContainer
        items={generateItems(5)}
        dropdownTriggerTooltip="Test tooltip"
      />,
    );
    userEvent.hover(screen.getByText('More'));
    expect(await screen.findByText('Test tooltip')).toBeInTheDocument();
  });
});