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
