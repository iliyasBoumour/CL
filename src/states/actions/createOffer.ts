import { ActionsType, Dispatch, Offer } from '../../lib/interfaces';
import { postAPI } from '../../utility/fetcher';
import { handleErrors } from './handleErrors';

export const createOffer = async (dispatch: Dispatch, offer: Offer) => {
  try {
    const data = await postAPI<Offer>(`/offers`, offer);
    dispatch({
      type: ActionsType.CREATE_OFFER,
      payload: data,
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.CREATE_OFFER_FAIL, error);
  }
};
