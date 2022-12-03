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
      localStorage.removeItem('user');
      return { ...state, auth: { token: null, user: null } };
    }

    case ActionsType.GET_OFFERS: {
      return { ...state, offers: { data: payload } };
    }
    case ActionsType.GET_OFFERS_FAIL: {
      return { ...state, offers: { error: payload, data: [] } };
    }

    case ActionsType.CREATE_OFFER: {
      return { ...state, offers: { data: [...state.offers.data, payload] } };
    }

    case ActionsType.GET_CATEGORIES: {
      return { ...state, categories: { data: payload } };
    }
    case ActionsType.GET_CATEGORIES_FAIL: {
      return { ...state, categories: { error: payload, data: null } };
    }

    case ActionsType.GET_DEMANDS: {
      return { ...state, demands: { data: payload } };
    }
    case ActionsType.GET_DEMANDS_FAIL: {
      return { ...state, demands: { error: payload, data: [] } };
    }

    case ActionsType.GET_MY_OFFERS: {
      return { ...state, myOffers: { data: payload } };
    }
    case ActionsType.GET_MY_OFFERS_FAIL: {
      return { ...state, myOffers: { error: payload, data: [] } };
    }

    case ActionsType.DELETE_OFFER: {
      return {
        ...state,
        myOffers: {
          data: state.myOffers.data.filter((offer) => offer.id !== payload),
        },
      };
    }

    default:
      return state;
  }
};
export default reducer;
