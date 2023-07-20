//before
import React from 'react';
import { styledMount as mount } from 'spec/helpers/theming';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import * as featureFlags from 'src/featureFlags';
import Welcome from 'src/pages/Home';
import { ReactWrapper } from 'enzyme';
import waitForComponentToPaint from 'spec/helpers/waitForComponentToPaint';
import { render, screen } from 'spec/helpers/testing-library';
import { getExtensionsRegistry } from '@superset-ui/core';
import setupExtensions from 'src/setup/setupExtensions';

//after
import React from 'react';
import { styledMount as mount } from 'spec/helpers/theming';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import * as featureFlags from 'src/featureFlags';
import Welcome from 'src/pages/Home';
import { ReactWrapper } from 'enzyme';
import waitForComponentToPaint from 'spec/helpers/waitForComponentToPaint';
import { screen } from 'spec/helpers/testing-library';
import { getExtensionsRegistry } from '@superset-ui/core';
import setupExtensions from 'src/setup/setupExtensions';
import { createRoot } from 'react-dom/client';

//before
render(
    <Provider store={store}>
      <Welcome {...mockedProps} />
    </Provider>,
  );

//after
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <Welcome {...mockedProps} />
    </Provider>,
  );