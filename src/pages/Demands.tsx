import { styled } from '@mui/material';
import React from 'react';
import { demands } from '../data/demands';
import { SideBar, SIDEBAR_WIDTH } from '../molecules/SideBar';
import { Table } from '../organismes/Table';

const sideBarItems = [
  { name: 'Tous', id: 'all' },
  { name: 'Archivees', id: 'Archivees' },
  { name: 'Statistiques', id: 'Statistiques' },
];

export const Demands = () => {
  return (
    <div>
      <SideBar title="Demandes" items={sideBarItems} />
      <Container>
        <Table requestedOffers={demands} />
      </Container>
    </div>
  );
};

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: ${SIDEBAR_WIDTH};
  padding: 2rem;
`;
