import { useContext } from 'react';
import { Container, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useOffers } from '../hooks/useOffers';
import { Loader } from '../atoms/Loader';
import { Button } from '../atoms/Button';
import { Header } from '../molecules/HomeHeader';
import { MaterialCard } from '../molecules/MaterialCard';
import { Store } from '../states/Store';

export const Home = () => {
  const navigate = useNavigate();
  const {
    state: {
      auth: { user },
    },
  } = useContext(Store);
  const { offers, error } = useOffers();

  return (
    <div>
      <Header />
      <Container maxWidth="xl" sx={{ padding: '4rem', textAlign: 'center' }}>
        <Typography variant="h2" marginBottom={4}>
          Nouvelles offres
        </Typography>
        {error ? (
          <Alert severity="error">Une erreur s'est produite</Alert>
        ) : !offers ? (
          <Loader />
        ) : (
          offers.length && (
            <>
              <Grid container spacing={7} mb={4}>
                {offers?.map((p) => (
                  <Grid item key={p.title} xs={12} md={6}>
                    <MaterialCard offer={p} userRoles={user?.role} />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/offers')}
              >
                Voir toutes les offres
              </Button>
            </>
          )
        )}
      </Container>
    </div>
  );
};
