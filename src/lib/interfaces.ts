import { Dispatch as ReactDisparch } from 'react';

// Models
export interface User {
  id: string;
  name: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface OfferCategory {
  id: string;
  name: string;
}

export interface RequestedOffer {
  id: string;
  offer: Offer;
  user: User;
  status: string;
}

// States

export interface AppState {
  auth: {
    token: string | null;
    error?: string;
  };
  offers: {
    data: Offer[] | null;
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

  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
}

export type Dispatch = ReactDisparch<Action>;
