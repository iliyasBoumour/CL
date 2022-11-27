import { AppState, ActionsType, Action } from '../lib/interfaces';

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    case ActionsType.USER_LOGIN: {
      const { token } = payload;
      localStorage.setItem('token', token);
      return { ...state, auth: { token } };
    }
    case ActionsType.USER_LOGIN_FAIL: {
      return { ...state, auth: { token: null, error: payload } };
    }
    case ActionsType.USER_LOGOUT: {
      localStorage.removeItem('token');
      return { ...state, auth: { token: null } };
    }
    default:
      return state;
  }
};
export default reducer;
