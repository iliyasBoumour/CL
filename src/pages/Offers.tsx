import { Box, styled, Grid, Alert } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react';
import { Loader } from '../atoms/Loader';
import { SearchField } from '../atoms/SearchField';
import { useOfferCategories } from '../hooks/useOfferCategories';
import { useOffers } from '../hooks/useOffers';
import { MaterialCard } from '../molecules/MaterialCard';
import { SideBar, SIDEBAR_WIDTH } from '../molecules/SideBar';
import { Store } from '../states/Store';

export const Offers = () => {
  const [searchKey, setSearchKey] = useState('');
  const {
    state: {
      auth: { user },
    },
  } = useContext(Store);
  const { offers, error } = useOffers();
  const { categories, error: errorCategories } = useOfferCategories();

  const filteredOffers = useMemo(
    () =>
      offers?.filter((offer) =>
        offer.title.toLowerCase().includes(searchKey.toLowerCase()),
      ) || [],
    [offers, searchKey],
  );

  if (error || errorCategories) {
    return <Alert severity="error">Une erreur s'est produite</Alert>;
  }

  return (
    <Box>
      {!categories || !offers ? (
        <Loader />
      ) : (
        <>
          <SideBar items={categories} title="Categories" />
          <Container>
            <ActionsContainer>
              <SearchField
                label="Rechercher par nom du materiel"
                value={searchKey}
                handleChange={setSearchKey}
              />
            </ActionsContainer>
            <Grid container spacing={7} mb={4}>
              {filteredOffers.map((p) => (
                <Grid item key={p.title} xs={12} md={6}>
                  <MaterialCard offer={p} userRoles={user?.role} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  margin-left: ${SIDEBAR_WIDTH};
  padding: 0 2rem;
`;

const ActionsContainer = styled('div')`
  width: min(100%, 500px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
