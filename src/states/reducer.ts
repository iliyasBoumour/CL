import { User, AppState, ActionsType, Action } from '../lib/interfaces';

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    case ActionsType.USER_LOGIN: {
      const { token, id, username, role } = payload;
      const user: User = { id, username, role };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...state, auth: { token, user } };
    }
    case ActionsType.USER_LOGIN_FAIL: {
      return { ...state, auth: { token: null, user: null, error: payload } };
    }
    case ActionsType.USER_LOGOUT: {
      localStorage.removeItem('token');
      return { ...state, auth: { token: null, user: null } };
    }

    case ActionsType.GET_OFFERS: {
      return { ...state, offers: { data: payload } };
    }
    case ActionsType.GET_OFFERS_FAIL: {
      return { ...state, offers: { error: payload, data: null } };
    }
    // case ActionsType.DEMAND_OFFER_FAIL: {
    //   return { ...state, offers: { error: payload } };
    // }

    case ActionsType.GET_CATEGORIES: {
      return { ...state, categories: { data: payload } };
    }
    case ActionsType.GET_CATEGORIES_FAIL: {
      return { ...state, categories: { error: payload, data: null } };
    }

    default:
      return state;
  }
};
export default reducer;
