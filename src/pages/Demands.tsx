import { Alert, styled } from '@mui/material';
import React from 'react';
import { useDemands } from '../hooks/useDemands';
import { SideBar, SIDEBAR_WIDTH } from '../molecules/SideBar';
import { Table } from '../organismes/Table';

const sideBarItems = [
  { name: 'Tous', id: 'all' },
  { name: 'Archivees', id: 'Archivees' },
  { name: 'Statistiques', id: 'Statistiques' },
];

export const Demands = () => {
  const { demands, error } = useDemands();
  return (
    <div>
      <SideBar title="Demandes" items={sideBarItems} />
      {error ? (
        <Alert severity="error">Une erreur est survenue</Alert>
      ) : (
        <Container>
          <Table requestedOffers={demands} />
        </Container>
      )}
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
