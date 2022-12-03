import { useContext } from 'react';
import { Store } from '../states/Store';
import { deleteApi } from '../utility/fetcher';

export const useDeleteOffer = () => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(Store);

  const deleteOffer = async (offerId: string) => {
    try {
      const data = await deleteApi<boolean>(`/offers/${offerId}`, token);
      return data;
    } catch (err: any) {
      return null;
    }
  };

  return deleteOffer;
};
