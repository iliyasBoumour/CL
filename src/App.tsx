import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './utility/theme';
import { Navbar, NAVBAR_HEIGHT } from './organismes/Navbar';
import { Home } from './pages/Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Router>
          <Navbar />
          <Box
            mt={NAVBAR_HEIGHT}
            minHeight="200vh"
            width="100%"
            overflow="hidden"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/cart" exact element={<Cart />} />
              <Route exact element={<IsConnected />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" exact element={<Register />} />
              </Route>

              <Route exact element={<ProtectedRoute />}>
                <Route path="/orders" element={<Orders />} />
              </Route>
              <Route exact element={<AdminRoute />}>
                <Route path="/validateOrders" element={<ValidateOrders />} />
              </Route> */}
            </Routes>
          </Box>
        </Router>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
