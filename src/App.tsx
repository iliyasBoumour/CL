import React, { useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import theme from './utility/theme';
import { Navbar, NAVBAR_HEIGHT } from './organismes/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/login';
import { SnackbarCloseButton } from './atoms/SnackbarCloseButton';
import { Offers } from './pages/Offers';
import { Emitter } from './utility/EventLEmitter';
import { UNAUTHORIZED } from './utility/fetcher';
import { Demands } from './pages/Demands';
import { MyOffers } from './pages/MyOffers';

const App = () => {
  const navigate = useNavigate();

  const snackbarAction = useCallback(
    (key: SnackbarKey) => <SnackbarCloseButton snackbarKey={key} />,
    [],
  );

  useEffect(() => {
    const listener = Emitter.addListener(UNAUTHORIZED, () =>
      navigate('/login', { replace: true }),
    );

    return () => {
      listener.remove();
    };
  }, [navigate]);

  return (
    <SnackbarProvider
      action={snackbarAction}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      dense
      maxSnack={1}
      preventDuplicate
    >
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Navbar />
          <Box mt={NAVBAR_HEIGHT} width="100%" overflow="hidden">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/demands" element={<Demands />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/my-offers" element={<MyOffers />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </StyledEngineProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
