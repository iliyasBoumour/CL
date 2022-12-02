import { Box, styled, Grid, Alert, Autocomplete } from '@mui/material';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../atoms/Button';
import { ControlledTextField } from '../atoms/ControlledTextField';
import { Loader } from '../atoms/Loader';
import { SearchField } from '../atoms/SearchField';
import { TextField } from '../atoms/TextField';
import { useOfferCategories } from '../hooks/useOfferCategories';
import { useOffers } from '../hooks/useOffers';
import { MaterialCard } from '../molecules/MaterialCard';
import { Popup } from '../molecules/Popup';
import { SideBar, SIDEBAR_WIDTH } from '../molecules/SideBar';
import { createOffer } from '../states/actions/createOffer';
import { Store } from '../states/Store';

export const Offers = () => {
  const [searchKey, setSearchKey] = useState('');
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [formCategories, setFormCategories] = useState<string[]>([]);
  const { dispatch } = useContext(Store);
  const { offers, error } = useOffers();
  const { categories, error: errorCategories } = useOfferCategories();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const filteredOffers = useMemo(
    () =>
      offers?.filter((offer) =>
        offer.title.toLowerCase().includes(searchKey.toLowerCase()),
      ) || [],
    [offers, searchKey],
  );

  const createNewOffer = useCallback(
    (data: any) => {
      setShowCreationPopup(false);
      createOffer(dispatch, { ...data, categoriesId: formCategories });
    },
    [dispatch, formCategories],
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
            <Popup
              open={showCreationPopup}
              onClose={() => setShowCreationPopup(false)}
              title="Créer une offre"
              loading={false}
            >
              <Form onSubmit={handleSubmit(createNewOffer)}>
                <ControlledTextField
                  type="text"
                  name="titre"
                  control={control}
                  errors={errors}
                />
                <ControlledTextField
                  type="description"
                  name="password"
                  control={control}
                  errors={errors}
                />
                <Autocomplete
                  multiple
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  onChange={(e, value) => {
                    const selectedCat = value.map((category) => category.id);
                    setFormCategories(selectedCat);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="categories" />
                  )}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ width: 'fit-content' }}
                  type="submit"
                >
                  Creer
                </Button>
              </Form>
            </Popup>
            <ActionsContainer>
              <SearchField
                label="Rechercher par nom du materiel"
                value={searchKey}
                handleChange={setSearchKey}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowCreationPopup(true)}
              >
                Ajouter une offre
              </Button>
            </ActionsContainer>
            <Grid container spacing={7} mb={4}>
              {filteredOffers.map((p) => (
                <Grid item key={p.title} xs={12} md={6}>
                  <MaterialCard {...p} />
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled('form')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.7rem;
`;
