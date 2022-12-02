import { handleErrors } from './handleErrors';
import { ActionsType, Dispatch, OfferCategory } from '../../lib/interfaces';
import { fetchAPI } from '../../utility/fetcher';

export const getOfferCategories = async (dispatch: Dispatch) => {
  try {
    const data = await fetchAPI<OfferCategory>(
      `${process.env.REACT_APP_API_URL}/offers/categories`,
    );
    dispatch({
      type: ActionsType.GET_CATEGORIES,
      payload: data,
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.GET_CATEGORIES_FAIL, error);
  }
};
