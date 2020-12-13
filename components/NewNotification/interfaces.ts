import { NOTIFICATION_TYPES } from '@constants';

export interface NotificationState {
  type: NOTIFICATION_TYPES.ERROR;
  text: string;
}
