import { Alert, Autocomplete, styled } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../atoms/Button';
import { ControlledTextField } from '../atoms/ControlledTextField';
import { TextField } from '../atoms/TextField';
import { useDeleteOffer } from '../hooks/useDeleteOffer';
import { useMyOffers } from '../hooks/useMyOffers';
import { useOfferCategories } from '../hooks/useOfferCategories';
import { Popup } from '../molecules/Popup';
import { SIDEBAR_WIDTH } from '../molecules/SideBar';
import { MyOffersTable } from '../organismes/MyOffersTable';
import { createOffer } from '../states/actions/createOffer';
import { Store } from '../states/Store';

export const MyOffers = () => {
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [formCategories, setFormCategories] = useState<string[]>([]);
  const { categories } = useOfferCategories();
  const deleteOffer = useDeleteOffer();
  const { myOffers, error } = useMyOffers();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    state: {
      auth: { token },
    },
    dispatch,
  } = useContext(Store);

  const createNewOffer = useCallback(
    (data: any) => {
      setShowCreationPopup(false);
      createOffer(dispatch, { ...data, categoriesId: formCategories }, token);
    },
    [dispatch, formCategories, token],
  );

  return (
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
            type="text"
            name="description"
            control={control}
            errors={errors}
          />
          <Autocomplete
            multiple
            options={categories || []}
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
          <Button color="secondary" sx={{ width: 'fit-content' }} type="submit">
            Creer
          </Button>
        </Form>
      </Popup>
      <ActionsContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreationPopup(true)}
        >
          Ajouter une offre
        </Button>
      </ActionsContainer>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <MyOffersTable offers={myOffers} deleteOffer={deleteOffer} />
      )}
    </Container>
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
