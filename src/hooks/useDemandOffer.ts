import { useContext } from 'react';
import { Store } from '../states/Store';
import { postAPI } from '../utility/fetcher';

export const useDemandOffer = () => {
  const { state } = useContext(Store);

  const requestOffer = async (offerId: string) => {
    try {
      const data = await postAPI(`/demandes/${offerId}`, {}, state.auth.token);
      return data;
    } catch (error) {
      return false;
    }
  };

  return {
    requestOffer,
  };
};
