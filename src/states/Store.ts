import { createContext } from 'react';
import { AppState, Dispatch } from '../lib/interfaces';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

export const initialState: AppState = {
  auth: {
    token,
    user: user ? JSON.parse(user) : null,
  },
  offers: { data: [] },
  myOffers: { data: [] },
  demands: { data: [] },
  categories: { data: [] },
};

export const Store = createContext<{
  state: AppState;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => null,
});
