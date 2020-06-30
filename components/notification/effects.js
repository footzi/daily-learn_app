import { setNotification } from '@store';

export const clearNotification = () => () => setNotification({ type: null, text: '' });
