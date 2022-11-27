import { FC, useMemo, useReducer } from 'react';
import { Store, initialState } from './Store';
import reducer from './reducer';

interface Props {
  children: React.ReactNode;
}

export const StoreProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
