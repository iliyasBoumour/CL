import { createContext } from 'react';
import { AppState, Dispatch } from '../lib/interfaces';

export const initialState: AppState = {
  auth: { token: localStorage.getItem('token') || null },
  offers: { data: null },
  categories: { data: null },
};

export const Store = createContext<{
  state: AppState;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => null,
});
