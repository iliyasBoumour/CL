import { useContext, useEffect } from 'react';
import { getDemands } from '../states/actions/demands';
import { Store } from '../states/Store';

export const useDemands = () => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    getDemands(dispatch, state.auth.token);
  }, [dispatch, state.auth.token]);

  return {
    demands: state.demands.data,
    error: state.demands.error,
  };
};
