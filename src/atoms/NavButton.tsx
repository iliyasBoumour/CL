import { styled } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: (e?: any) => void;
  endIcon?: ReactNode;
}

export const NavButton: FC<Props> = ({ onClick, endIcon, children }) => {
  return (
    <Button onClick={onClick}>
      {children}
      {endIcon && <EndIcon>{endIcon}</EndIcon>}
    </Button>
  );
};

const Button = styled('div')`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  &:after {
    content: '';
    display: block;
    border-bottom: 2px solid black;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`;

const EndIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;
