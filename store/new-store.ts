import React from 'react';

export interface State {
  user: null;
}

export const initialState = {
  user: null,
};

export interface AppContextType {
  state: State;
  dispatch: React.Dispatch<ACTION<any>>;
}


export enum ACTIONS {
  SET_USER = 'SET_USER'
}

export interface ACTION<T> {
  type: ACTIONS,
  payload: T
}

export const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

export const reducer = (state: State, action): State => {
  console.log(action.payload, 'action');
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { user: action.payload };
  }
};
