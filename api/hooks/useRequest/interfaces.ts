import { Options as AxiosOptions, ResponseValues } from 'axios-hooks';
import { AxiosRequestConfig } from 'axios';

export interface Options extends AxiosOptions {
  onSuccess?(): void;
  onError?(): void;
}

export type UseRequestResult<TResponse = any, TBody = any, TError = any> = [
  ResponseValues<TResponse, TBody, TError>,
  (config?: AxiosRequestConfig<TBody>, options?: Options) => Promise<TResponse>
];
