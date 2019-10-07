import { actions } from '../../store';

export const clearNotification = () => () => {
  actions.setNotification({ type: null, text: '' });
};
