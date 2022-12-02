import { getAxiosError } from '../../utility/fetcher';
import { Dispatch, ActionsType } from '../../lib/interfaces';

export const handleErrors = (
  dispatch: Dispatch,
  actionType: ActionsType,
  error: any,
) => {
  dispatch({
    type: actionType,
    payload: getAxiosError(error),
  });
};
