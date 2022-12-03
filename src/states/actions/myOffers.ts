import { ActionsType, Dispatch, Offer } from '../../lib/interfaces';
import { fetchAPI } from '../../utility/fetcher';
import { handleErrors } from './handleErrors';

export const getMyOffers = async (dispatch: Dispatch, token: string | null) => {
  try {
    const data = await fetchAPI<Offer[]>(`/my-offers`, token);
    dispatch({
      type: ActionsType.GET_MY_OFFERS,
      payload: data,
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.GET_MY_OFFERS_FAIL, error);
  }
};
