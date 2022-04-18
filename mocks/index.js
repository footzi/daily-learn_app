import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

import { SETTINGS } from '../constants';
import { createTestStore } from '../store';

export const mockFormData = () => {
  const entries = jest.fn();
  const append = jest.fn();
  return (global.FormData = () => ({ entries, append }));
};

export const mockRefreshToken = (request) => {
  request.onPost(`${SETTINGS.host}/api/refresh`).reply(200, {
    data: {
      access_token: '',
      refresh_token: '',
      expire: '',
    },
  });
};

export const renderWithRedux = (children, initialState = {}) => {
  const store = createTestStore(initialState);

  return {
    ...render(<Provider store={store}>{children}</Provider>),
    store,
  };
};
