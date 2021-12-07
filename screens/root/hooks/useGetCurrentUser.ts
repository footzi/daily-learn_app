// import { TOKENS_LS } from "@constants";

import { useGetMainData } from "../../../api/hooks/useGetMainData";

/**
 * Хук получения текущего пользователя
 */
export const useGetCurrentUser = () => {
  useGetMainData();
  // const ts = await localStorage.getItem(TOKENS_LS);
}
