import { reducer } from '../index';
import { SET_AUTH, SET_USER, SET_DATA, SET_NOTIFICATION, SET_PROCESSING } from '../../constants/action-types';
import { ERROR } from '../../constants';

describe('Main reducer', () => {
  it('Set auth true', () => {
    const initState = {
      auth: false
    };

    const action = {
      type: SET_AUTH,
      payload: true
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      auth: action.payload
    });
  });

  it('Set auth false', () => {
    const initState = {
      auth: true
    };

    const action = {
      type: SET_AUTH,
      payload: false
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      auth: action.payload
    });
  });

  it('Set user', () => {
    const initState = {
      user: null
    };

    const action = {
      type: SET_USER,
      payload: {
        id: 1
      }
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      user: action.payload
    });
  });

  it('Remove user', () => {
    const initState = {
      user: {
        id: 1
      }
    };

    const action = {
      type: SET_USER,
      payload: null
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      user: action.payload
    });
  });

  it('Set data', () => {
    const initState = {
      data: null
    };

    const action = {
      type: SET_DATA,
      payload: {
        dictionaries: []
      }
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      data: action.payload
    });
  });

  it('Set notification', () => {
    const initState = {
      notification: {
        type: '',
        text: ''
      }
    };

    const action = {
      type: SET_NOTIFICATION,
      payload: {
        type: ERROR,
        text: 'ERROR 500'
      }
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      notification: action.payload
    });
  });

  it('Clear notification', () => {
    const initState = {
      notification: {
        type: ERROR,
        text: 'ERROR 500'
      }
    };

    const action = {
      type: SET_NOTIFICATION,
      payload: {
        type: '',
        text: ''
      }
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      notification: action.payload
    });
  });

  it('Set processing true', () => {
    const initState = {
      processing: false
    };

    const action = {
      type: SET_PROCESSING,
      payload: {
        processing: true
      }
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      processing: action.payload
    });
  });

  it('Set processing false', () => {
    const initState = {
      processing: true
    };

    const action = {
      type: SET_PROCESSING,
      payload: {
        processing: false
      }
    };

    expect(reducer(initState, action)).toEqual({
      ...initState,
      processing: action.payload
    });
  });
});
