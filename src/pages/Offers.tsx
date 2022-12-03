import { Box, styled, Grid, Alert } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../atoms/Loader';
import { useOfferCategories } from '../hooks/useOfferCategories';
import { useOffers } from '../hooks/useOffers';
import { OfferWithCategory } from '../lib/interfaces';
import { MaterialCard } from '../molecules/MaterialCard';
import { SideBar, SIDEBAR_WIDTH } from '../molecules/SideBar';
import { Store } from '../states/Store';

export const Offers = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('0');
  const [filtredOffers, setFiltredOffers] = useState<OfferWithCategory[]>([]);
  const {
    state: {
      auth: { user },
    },
  } = useContext(Store);
  const { offers, error } = useOffers();
  const { categories, error: errorCategories } = useOfferCategories();

  useEffect(() => {
    if (!offers) return;
    if (selectedCategoryId === '0') {
      setFiltredOffers(offers);
    } else {
      setFiltredOffers(
        offers.filter((offer) =>
          offer.categoryIds.some((id) => id === selectedCategoryId),
        ),
      );
    }
  }, [offers, selectedCategoryId]);

  if (error || errorCategories) {
    return <Alert severity="error">Une erreur s'est produite</Alert>;
  }

  return (
    <Box>
      {!categories || !offers ? (
        <Loader />
      ) : (
        <>
          <SideBar
            onSelect={setSelectedCategoryId}
            items={[{ id: '0', name: 'Tout' }, ...categories]}
            title="Categories"
            selectedId={selectedCategoryId}
          />
          <Container>
            <Grid container spacing={7} mb={4}>
              {filtredOffers.map((p) => (
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
