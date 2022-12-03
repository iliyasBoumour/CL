import { forwardRef, FC } from 'react';
import { Slide, DialogTitle, Dialog, styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
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
  loading: boolean;
  children: React.ReactNode;
}

export const Popup: FC<Props> = ({
  title,
  open,
  onClose,
  loading,
  children,
}) => {
  return (
    <div>
      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <DialogTitle>{title}</DialogTitle>
            {children}
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
