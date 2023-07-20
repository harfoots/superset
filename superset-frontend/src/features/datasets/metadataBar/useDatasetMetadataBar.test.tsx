//after
import fetchMock from 'fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import { createWrapper, createRoot } from 'spec/helpers/testing-library';
import { supersetGetCache } from 'src/utils/cachedSupersetGet';
import { useDatasetMetadataBar } from './useDatasetMetadataBar';

const MOCK_DATASET = {
  changed_on: '2023-01-26T12:06:58.733316',
  changed_on_humanized: 'a month ago',
  changed_by: { first_name: 'Han', last_name: 'Solo' },
  created_by: { first_name: 'Luke', last_name: 'Skywalker' },
  created_on: '2023-01-26T12:06:54.965034',
  created_on_humanized: 'a month ago',
  table_name: `This is dataset's name`,
  owners: [
    { first_name: 'John', last_name: 'Doe' },
    { first_name: 'Luke', last_name: 'Skywalker' },
  ],
  description: 'This is a dataset description',
};

afterEach(() => {
  fetchMock.restore();
  supersetGetCache.clear();
});

test('renders dataset metadata bar from request', async () => {
  fetchMock.get('glob:*/api/v1/dataset/1', {
    result: MOCK_DATASET,
  });

  const { result, waitForValueToChange } = renderHook(
    () => useDatasetMetadataBar({ datasetId: 1 }),
    {
      wrapper: createWrapper(),
    },
  );
  expect(result.current.status).toEqual('loading');
  await waitForValueToChange(() => result.current.status);
  expect(result.current.status).toEqual('complete');

  expect(fetchMock.called()).toBeTruthy();
  const container = document.getElementById('app');
  const root = createRoot(container);
  const { findByText, findAllByRole } = root.render(result.current.metadataBar);
  expect(await findByText(`This is dataset's name`)).toBeVisible();
  expect(await findByText('This is a dataset description')).toBeVisible();
  expect(await findByText('Luke Skywalker')).toBeVisible();
  expect(await findByText('a month ago')).toBeVisible();
  expect(await findAllByRole('img')).toHaveLength(4);
});

test('renders dataset metadata bar without request', async () => {
  fetchMock.get('glob:*/api/v1/dataset/1', {
    result: {},
  });

  const { result } = renderHook(
    () => useDatasetMetadataBar({ dataset: MOCK_DATASET }),
    {
      wrapper: createWrapper(),
    },
  );

  expect(result.current.status).toEqual('complete');

  expect(fetchMock.called()).toBeFalsy();
  const container = document.getElementById('app');
  const root = createRoot(container);
  const { findByText, findAllByRole } = root.render(result.current.metadataBar);
  expect(await findByText(`This is dataset's name`)).toBeVisible();
  expect(await findByText('This is a dataset description')).toBeVisible();
  expect(await findByText('Luke Skywalker')).toBeVisible();
  expect(await findByText('a month ago')).toBeVisible();
  expect(await findAllByRole('img')).toHaveLength(4);
});

test('renders dataset metadata bar without description and owners', async () => {
  fetchMock.get('glob:*/api/v1/dataset/1', {
    result: {
      changed_on: '2023-01-26T12:06:58.733316',
      changed_on_humanized: 'a month ago',
      created_on: '2023-01-26T12:06:54.965034',
      created_on_humanized: 'a month ago',
      table_name: `This is dataset's name`,
    },
  });

  const { result, waitForValueToChange } = renderHook(
    () => useDatasetMetadataBar({ datasetId: 1 }),
    {
      wrapper: createWrapper(),
    },
  );
  expect(result.current.status).toEqual('loading');
  await waitForValueToChange(() => result.current.status);
  expect(result.current.status).toEqual('complete');

  expect(fetchMock.called()).toBeTruthy();
  const container = document.getElementById('app');
  const root = createRoot(container);
  const { findByText, queryByText, findAllByRole } = root.render(
    result.current.metadataBar,
  );
  expect(await findByText(`This is dataset's name`)).toBeVisible();
  expect(queryByText('This is a dataset description')).not.toBeInTheDocument();
  expect(await findByText('Not available')).toBeVisible();
  expect(await findByText('a month ago')).toBeVisible();
  expect(await findAllByRole('img')).toHaveLength(3);
});