import { FC, ReactNode } from 'react';
import {
  Button as MuiButton,
  styled,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

interface Props extends MuiButtonProps {
  children: ReactNode;
}

export const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton variant="outlined" color="primary" size="medium" {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(MuiButton)`
  width: fit-content;
  padding: 0.5rem 2rem;
`;
