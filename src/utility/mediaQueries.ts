import { useMediaQuery } from '@mui/material';

export const useIsSmallMobile = () => {
  return useMediaQuery('(max-width: 400px)');
};

export const useIsMobile = () => {
  return useMediaQuery('(max-width: 500px)');
};

export const useIsSmallTablet = () => {
  return useMediaQuery('(max-width: 900px)');
};

export const useIsTablet = () => {
  return useMediaQuery('(max-width: 1024px)');
};

export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1700.02px)');
};
