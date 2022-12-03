import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { NAVBAR_HEIGHT } from '../organismes/Navbar';

export const SIDEBAR_WIDTH = '240px';

interface Props {
  title: string;
  items: {
    name: string;
    id: string;
  }[];
  onSelect: (id: string) => void;
  selectedId: string;
}

export const SideBar: FC<Props> = ({ title, items, onSelect, selectedId }) => {
  return (
    <Bar>
      <Typography variant="h4" mb={2}>
        {title}
      </Typography>
      {items.map((item) => (
        <Category
          key={item.id}
          onClick={() => onSelect(item.id)}
          selected={selectedId === item.id}
        >
          {item.name}
        </Category>
      ))}
    </Bar>
  );
};

const Bar = styled('div')`
  padding: 0.5rem;
  padding-top: 2rem;
  width: ${SIDEBAR_WIDTH};
  background: ${({ theme }) => theme.palette.secondary.light};
  color: ${({ theme }) => theme.palette.secondary.main};
  position: fixed;
  top: ${NAVBAR_HEIGHT};
  left: 0;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
`;

const Category = styled('div')<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  background: ${({ selected, theme }) =>
    selected ? theme.palette.secondary.dark : 'transparent'};
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.dark};
  }
`;
