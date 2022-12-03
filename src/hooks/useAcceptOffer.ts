import { useContext, useState } from 'react';
import { getOffers } from '../states/actions/offers';
import { Store } from '../states/Store';
import { getAxiosError, postAPI } from '../utility/fetcher';

export const useAcceptOffer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(Store);
  const {
    auth: { token },
  } = state;

  const acceptOffer = async (offerId: string) => {
    try {
      await postAPI<boolean>(`/demandes/${offerId}/accept`, {}, token);
      await getOffers(dispatch);
    } catch (err: any) {
      setError(getAxiosError(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    acceptOffer,
    loading,
  };
};
