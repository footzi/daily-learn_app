import { actions } from '../index';
import { SET_AUTH, SET_USER, SET_DATA, SET_NOTIFICATION, SET_PROCESSING } from '../../constants/action-types';
import { ERROR } from '../../constants';

describe('Main actions', () => {
  it('setAuth', () => {
    const expectedAction = {
      type: SET_AUTH,
      payload: true
    };

    expect(actions.setAuth()).toEqual(expectedAction);
  });

  it('removeAuth', () => {
    const expectedAction = {
      type: SET_AUTH,
      payload: false
    };

    expect(actions.removeAuth()).toEqual(expectedAction);
  });

  it('setUser', () => {
    const expectedAction = {
      type: SET_USER,
      payload: {
        id: 1
      }
    };

    expect(actions.setUser(expectedAction.payload)).toEqual(expectedAction);
  });

  it('removeUser', () => {
    const expectedAction = {
      type: SET_USER,
      payload: null
    };

    expect(actions.removeUser()).toEqual(expectedAction);
  });

  it('setData', () => {
    const expectedAction = {
      type: SET_DATA,
      payload: {
        dictionaries: []
      }
    };

    expect(actions.setData(expectedAction.payload)).toEqual(expectedAction);
  });

  it('clearData', () => {
    const expectedAction = {
      type: SET_DATA,
      payload: null
    };

    expect(actions.clearData()).toEqual(expectedAction);
  });

  it('setNotification', () => {
    const expectedAction = {
      type: SET_NOTIFICATION,
      payload: {
        type: ERROR,
        text: 'Error 500'
      }
    };

    expect(actions.setNotification(expectedAction.payload)).toEqual(expectedAction);
  });

  it('clearNotification', () => {
    const expectedAction = {
      type: SET_NOTIFICATION,
      payload: {
        type: '',
        text: ''
      }
    };

    expect(actions.clearNotification()).toEqual(expectedAction);
  });

  it('setProcessing', () => {
    const expectedAction = {
      type: SET_PROCESSING,
      payload: true
    };

    expect(actions.setProcessing()).toEqual(expectedAction);
  });

  it('clearProcessing', () => {
    const expectedAction = {
      type: SET_PROCESSING,
      payload: false
    };

    expect(actions.removeProcessing()).toEqual(expectedAction);
  });
});
