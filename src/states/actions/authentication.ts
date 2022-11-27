import axios from 'axios';
import { ActionsType, Dispatch } from '../../lib/interfaces';

export const signin = async (dispatch: Dispatch, user: any) => {
  try {
    const { data } = await axios.post(`/api/auth/login`, user);
    dispatch({
      type: ActionsType.USER_LOGIN,
      payload: {
        ...data,
      },
    });
  } catch (error: any) {
    dispatch({
      type: ActionsType.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signup = async (dispatch: Dispatch, user: any) => {
  try {
    await axios.post(`/api/auth/register`, user);
  } catch (error: any) {
    dispatch({
      type: ActionsType.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = (dispatch: Dispatch) => {
  dispatch({
    type: ActionsType.USER_LOGOUT,
    payload: null,
  });
};
