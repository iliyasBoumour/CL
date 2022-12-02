import { Dispatch as ReactDisparch } from 'react';

// Models
export enum Roles {
  ROLE_MEMBRE = 'ROLE_MEMBRE',
  ROLE_REPRESENTANT = 'ROLE_REPRESENTANT',
}

export interface User {
  id: string;
  username: string;
  role: Roles[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
}

export interface OfferCategory {
  id: string;
  name: string;
}

export interface RequestedOffer {
  id: string;
  offerName: string;
  requestor: string;
}

// States

export interface AppState {
  auth: {
    token: string | null;
    user: User | null;
    error?: string;
  };
  offers: {
    data: Offer[];
    error?: string;
  };
  categories: {
    data: OfferCategory[] | null;
    error?: string;
  };
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

// Actions

export enum ActionsType {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT',

  GET_OFFERS = 'GET_OFFERS',
  GET_OFFERS_FAIL = 'GET_OFFERS_FAIL',

  DEMAND_OFFER = 'DEMAND_OFFER',
  DEMAND_OFFER_FAIL = 'DEMAND_OFFER_FAIL',

  CREATE_OFFER = 'CREATE_OFFER',
  CREATE_OFFER_FAIL = 'CREATE_OFFER_FAIL',

  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
}

export type Dispatch = ReactDisparch<Action>;
