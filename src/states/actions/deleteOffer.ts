import { ActionsType, Dispatch } from '../../lib/interfaces';
import { deleteApi } from '../../utility/fetcher';
import { handleErrors } from './handleErrors';

export const deleteOffer = async (
  dispatch: Dispatch,
  offerId: string,
  token: string | null,
) => {
  try {
    await deleteApi<boolean>(`/offers/${offerId}`, token);
    dispatch({
      type: ActionsType.DELETE_OFFER,
      payload: offerId,
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.DELETE_OFFER_FAIL, error);
  }
};
