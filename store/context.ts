import React, { useContext } from 'react';
import { AppContextType } from './interfaces';
import { initialState } from './state';

export const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

export const useAppContext = () => useContext(AppContext);
