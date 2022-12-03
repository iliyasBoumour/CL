import { useContext, useEffect } from 'react';
import { OfferWithCategory } from '../lib/interfaces';
import { getOffers } from '../states/actions/offers';
import { Store } from '../states/Store';

export const useOffers = (): {
  offers: OfferWithCategory[] | null;
  error: any;
} => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    getOffers(dispatch);
  }, [dispatch]);

  return {
    offers: state.offers.data,
    error: state.offers.error,
  };
};
