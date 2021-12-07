import { SETTINGS } from "@constants";
import { REQUEST_PARAMS, API_LIST } from './constants';
import { REQUEST_PARAM } from "./interfaces";

export const getRequestConfig = (api: API_LIST): REQUEST_PARAM => {
  const config = REQUEST_PARAMS[api];
  const url = `${SETTINGS.host}${config.url}`

  return {
    url,
    method: config.method
  }
}
