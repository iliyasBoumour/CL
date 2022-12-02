import { handleErrors } from './handleErrors';
import { ActionsType, Dispatch, User } from '../../lib/interfaces';
import { postAPI } from '../../utility/fetcher';

export const signIn = async (dispatch: Dispatch, user: any) => {
  try {
    const data = await postAPI<User>(
      `${process.env.REACT_APP_API_URL}/authentication/connexion`,
      user,
    );
    dispatch({
      type: ActionsType.USER_LOGIN,
      payload: {
        ...data,
      },
    });
  } catch (error: any) {
    handleErrors(dispatch, ActionsType.USER_LOGIN_FAIL, error);
  }
};

export const logout = (dispatch: Dispatch) => {
  dispatch({
    type: ActionsType.USER_LOGOUT,
    payload: null,
  });
};
