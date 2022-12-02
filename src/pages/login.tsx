/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect } from 'react';
import {
  Box,
  Container as MuiContainer,
  Grid,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Button } from '../atoms/Button';
import { Store } from '../states/Store';
import { signIn } from '../states/actions/authentication';
import { NAVBAR_HEIGHT } from '../organismes/Navbar';
import { ControlledTextField } from '../atoms/ControlledTextField';

export const Login = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);

  const login = async (data: any) => {
    console.log(data);
    closeSnackbar();
    signIn(dispatch, data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (state.auth.error) {
      enqueueSnackbar(state.auth.error, {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, state.auth]);

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        <Grid item xs={12} md={6}>
          <LeftPaper>
            <Typography variant="h4">
              Connectez-vous et échangez vos matériaux dès maintenant
            </Typography>
            <Box>
              <Typography variant="subtitle1">username: user</Typography>
              <Typography variant="subtitle1">Password: 123456</Typography>
            </Box>
          </LeftPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <RightPaper elevation={7}>
            <Typography variant="h3">Se connecter</Typography>
            <Form onSubmit={handleSubmit(login)}>
              <ControlledTextField
                type="username"
                name="username"
                control={control}
                errors={errors}
              />
              <ControlledTextField
                type="password"
                name="password"
                control={control}
                errors={errors}
              />
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: 'fit-content' }}
                type="submit"
              >
                Se connecter
              </Button>
            </Form>
          </RightPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

const Container = styled(MuiContainer)`
  min-height: calc(100vh - ${NAVBAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightPaper = styled(Paper)`
  border-radius: 0;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const LeftPaper = styled(RightPaper)`
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Form = styled('form')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.7rem;
`;
