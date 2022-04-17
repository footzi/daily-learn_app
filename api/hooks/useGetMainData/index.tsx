import { getRequestConfig } from '../../utils';
import { API_LIST } from '../../constants';
import { useContext, useEffect } from 'react';
import { ACTIONS, AppContext } from '../../../store/new-store';
import { useRequest } from '../useRequest';
import { UseGetMainDataResult } from './interfaces';

/**
 * Хук получения основных данных
 */
export const useGetMainData = (): UseGetMainDataResult => {
  const { url, method } = getRequestConfig(API_LIST.MAIN_DATA);

  const [{ data, loading, error }, refetch] = useRequest({
    url,
    method,
  });

  const { dispatch } = useContext(AppContext);

  const user = data?.data?.user;
  const dictionaries = data?.data?.dictionaries;

  useEffect(() => {
    // @todo переделавть в экшены,
    if (user) {
      dispatch({
        type: ACTIONS.SET_USER,
        payload: user,
      });
    }

    if (dictionaries) {
      dispatch({
        type: ACTIONS.SET_DICTIONARIES,
        payload: dictionaries,
      });
    }

    dispatch({
      type: ACTIONS.SET_REFETCH_MAIN_DATA,
      payload: refetch,
    });
  }, [user, dictionaries]);

  return {
    // data: {
    //   user,
    //   dictionaries,
    // },
    isLoading: loading,
    error,
    refetch,
  };
};
