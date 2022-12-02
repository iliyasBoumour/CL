import { useContext, useEffect } from 'react';
import { OfferCategory } from '../lib/interfaces';
import { getOfferCategories } from '../states/actions/categories';
import { Store } from '../states/Store';

export const useOfferCategories = (): {
  categories: OfferCategory[] | null;
  error: any;
} => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    getOfferCategories(dispatch);
  }, [dispatch]);

  return {
    categories: state.categories.data,
    error: state.categories.error,
  };
};
