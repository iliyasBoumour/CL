import { Alert, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDemands } from '../hooks/useDemands';
import { RequestedOffer } from '../lib/interfaces';
import { SideBar, SIDEBAR_WIDTH } from '../molecules/SideBar';
import { Table } from '../organismes/Table';

const sideBarItems = [
  { name: 'Tous', id: 'all' },
  { name: 'Archivees', id: 'Archivees' },
];

export const Demands = () => {
  const { demands, error } = useDemands();
  const [showArchived, setShowArchived] = useState<string>('all');
  const [filtredDemands, setFiltredDemands] = useState<RequestedOffer[]>([]);

  useEffect(() => {
    if (!demands) return;
    if (showArchived === 'all') {
      setFiltredDemands(demands);
    } else {
      setFiltredDemands(demands.filter((demand) => demand.archived));
    }
  }, [demands, showArchived]);

  return (
    <div>
      <SideBar
        title="Demandes"
        items={sideBarItems}
        onSelect={setShowArchived}
      />

      <Container>
        {error ? (
          <Alert severity="error">Une erreur est survenue</Alert>
        ) : (
          <Table requestedOffers={filtredDemands} />
        )}
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
