import { styled } from '@mui/material';
import { FC } from 'react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerButton: FC<Props> = ({ isOpen, onClick }) => {
  return (
    <Burger onClick={onClick} isOpen={isOpen}>
      <div />
    </Burger>
  );
};

const Burger = styled('div')<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1000;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  div {
    border-radius: 5px;
    width: 27px;
    height: 2px;
    background-color: ${({ isOpen, theme }) =>
      isOpen ? 'transparent' : theme.palette.secondary.main};
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(-50px)' : 'translateX(0px)'};

    border-radius: 5px;
    transition: all 0.5s ease-in-out;
    &::after,
    &::before {
      content: '';
      position: absolute;
      width: 27px;
      height: 2px;
      background-color: ${({ theme }) => theme.palette.secondary.main};
      border-radius: 5px;
      transition: all 0.5s ease-in-out;
    }
    &::after {
      transform: ${({ isOpen }) =>
        isOpen ? 'rotate(-45deg) translate(35px,35px)' : 'translate(0px,7px)'};
    }
    &::before {
      transform: ${({ isOpen }) =>
        isOpen ? 'rotate(45deg) translate(35px,-35px)' : 'translate(0px,-7px)'};
    }
  }
`;
