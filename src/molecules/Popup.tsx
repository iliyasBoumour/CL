import { forwardRef, FC } from 'react';
import {
  Slide,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  styled,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Button } from '../atoms/Button';
import { TextField } from '../atoms/TextField';
import { Loader } from '../atoms/Loader';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  onSuccessfulSubmit: () => void;
  loading: boolean;
}

export const Popup: FC<Props> = ({
  title,
  open,
  onClose,
  onSuccessfulSubmit,
  loading,
}) => {
  return (
    <div>
      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        {loading ? (
          <Loader />
        ) : (
          <>
            <DialogContent>
              <TextField fullWidth multiline minRows={4} placeholder={title} />
            </DialogContent>
            <Actions>
              <Button onClick={onClose} color="secondary">
                Disagree
              </Button>
              <Button
                onClick={onSuccessfulSubmit}
                color="secondary"
                variant="contained"
              >
                Envoyer
              </Button>
            </Actions>
          </>
        )}
      </StyledDialog>
    </div>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: min(90%, 900px);
    max-width: 900px;
    padding: 1rem 0.5rem;
  }
`;

const Actions = styled(DialogActions)`
  padding: 0.5rem 2rem;
`;
