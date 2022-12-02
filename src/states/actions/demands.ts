import { ActionsType, Dispatch, RequestedOffer } from '../../lib/interfaces';
import { fetchAPI } from '../../utility/fetcher';
import { handleErrors } from './handleErrors';

export const getDemands = async (dispatch: Dispatch, token: string | null) => {
  try {
    const data = await fetchAPI<RequestedOffer[]>(`/demands`, token);
    dispatch({
      type: ActionsType.GET_DEMANDS,
      payload: data,
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.GET_DEMANDS_FAIL, error);
  }
};
