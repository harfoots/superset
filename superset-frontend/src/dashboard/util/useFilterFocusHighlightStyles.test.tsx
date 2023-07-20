//before
import React from 'react';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mockState from 'spec/fixtures/mockState';
import reducerIndex from 'spec/helpers/reducerIndex';
import { screen, render } from 'spec/helpers/testing-library';
import { initialState } from 'src/SqlLab/fixtures';
import { dashboardFilters } from 'spec/fixtures/mockDashboardFilters';
import { dashboardWithFilter } from 'spec/fixtures/mockDashboardLayout';
import { buildActiveFilters } from './activeDashboardFilters';
import useFilterFocusHighlightStyles from './useFilterFocusHighlightStyles';

//after
import React from 'react';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mockState from 'spec/fixtures/mockState';
import reducerIndex from 'spec/helpers/reducerIndex';
import { screen, createRoot } from 'spec/helpers/testing-library';
import { initialState } from 'src/SqlLab/fixtures';
import { dashboardFilters } from 'spec/fixtures/mockDashboardFilters';
import { dashboardWithFilter } from 'spec/fixtures/mockDashboardLayout';
import { buildActiveFilters } from './activeDashboardFilters';
import useFilterFocusHighlightStyles from './useFilterFocusHighlightStyles';

//before
const renderWrapper = (chartId: number, store = createMockStore()) =>
    render(<TestComponent chartId={chartId} />, {
      useRouter: true,
      useDnd: true,
      useRedux: true,
      store,
    });

//after
const renderWrapper = (chartId: number, store = createMockStore()) => {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<TestComponent chartId={chartId} />, {
      useRouter: true,
      useDnd: true,
      useRedux: true,
      store,
    });
}