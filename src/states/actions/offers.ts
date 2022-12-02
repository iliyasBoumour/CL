import { handleErrors } from './handleErrors';
import { ActionsType, Dispatch, Offer } from '../../lib/interfaces';
import { postAPI, fetchAPI } from '../../utility/fetcher';

export const getOffers = async (dispatch: Dispatch) => {
  try {
    const data = await fetchAPI<Offer[]>(`/offers`);
    dispatch({
      type: ActionsType.GET_OFFERS,
      payload: data,
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.GET_OFFERS_FAIL, error);
  }
};

export const demandOffer = async (dispatch: Dispatch, offerId: string) => {
  try {
    await postAPI<Offer>(`/offers/demand?offerId${offerId}`);
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.DEMAND_OFFER_FAIL, error);
  }
};
export const logout = (dispatch: Dispatch) => {
  dispatch({
    type: ActionsType.USER_LOGOUT,
    payload: null,
  });
};
