import { useContext, useState } from 'react';
import { Store } from '../states/Store';
import { getAxiosError, postAPI } from '../utility/fetcher';

export const useDeclineOffer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const { state } = useContext(Store);
  const {
    auth: { token },
  } = state;

  const declineOffer = async (offerId: string) => {
    try {
      await postAPI<boolean>(`/offers/${offerId}/decline`, {}, token);
    } catch (err: any) {
      setError(getAxiosError(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    declineOffer,
    loading,
  };
};
