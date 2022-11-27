import { Dispatch as ReactDisparch } from 'react';

// Models
export interface User {
  id: string;
  name: string;
}

// States

export interface AppState {
  auth: {
    token: string | null;
    error?: string;
  };
}

export enum ActionsType {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT',
}

export interface Action {
  type: ActionsType;
  payload: any | null;
}

export interface ServerError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export type Dispatch = ReactDisparch<Action>;
