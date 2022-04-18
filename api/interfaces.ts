import { AxiosError, Method } from 'axios';

export interface REQUEST_PARAM {
  url: string;
  method: Method;
}

export interface UseRequestResult {
  isLoading?: boolean;
  error?: AxiosError;
}

export interface UseRequestResultQuery extends UseRequestResult {
  refetch?: () => void;
}
