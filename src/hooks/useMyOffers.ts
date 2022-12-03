import { useContext, useEffect } from 'react';
import { getMyOffers } from '../states/actions/myOffers';
import { Store } from '../states/Store';

export const useMyOffers = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    getMyOffers(dispatch, state.auth.token);
  }, [dispatch, state.auth.token]);

  return {
    myOffers: state.myOffers.data,
    error: state.myOffers.error,
  };
};
