import { FC } from 'react';
import { Close as IconClose } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SnackbarKey, useSnackbar } from 'notistack';

interface Props {
  snackbarKey: SnackbarKey;
}

export const SnackbarCloseButton: FC<Props> = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose />
    </IconButton>
  );
};
