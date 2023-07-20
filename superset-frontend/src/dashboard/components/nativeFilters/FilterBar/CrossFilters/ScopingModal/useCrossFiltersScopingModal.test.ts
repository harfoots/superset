//before
import { ReactElement } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createWrapper, render } from 'spec/helpers/testing-library';
import { useCrossFiltersScopingModal } from './useCrossFiltersScopingModal';

test('Renders modal after calling method open', async () => {
  const { result } = renderHook(() => useCrossFiltersScopingModal(), {
    wrapper: createWrapper(),
  });

  const [openModal, Modal] = result.current;
  expect(Modal).toBeNull();

  openModal();

  const { getByText } = render(result.current[1] as ReactElement, {
    useRedux: true,
  });

  expect(getByText('Cross-filtering scoping')).toBeInTheDocument();
});

//after
import { ReactElement } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createWrapper, createRoot } from 'spec/helpers/testing-library';
import { useCrossFiltersScopingModal } from './useCrossFiltersScopingModal';

test('Renders modal after calling method open', async () => {
  const { result } = renderHook(() => useCrossFiltersScopingModal(), {
    wrapper: createWrapper(),
  });

  const [openModal, Modal] = result.current;
  expect(Modal).toBeNull();

  openModal();

  const container = document.getElementById('app');
  const root = createRoot(container);
  const { getByText } = root.render(result.current[1] as ReactElement, {
    useRedux: true,
  });

  expect(getByText('Cross-filtering scoping')).toBeInTheDocument();
});