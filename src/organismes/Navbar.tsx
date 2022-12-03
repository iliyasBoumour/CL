import { useEffect, useState, useContext, useCallback } from 'react';
import { styled } from '@mui/material';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { Store } from '../states/Store';
import logo from '../assets/images/logo.png';
import { NavMenu } from '../molecules/NavMenu';
import { Roles } from '../lib/interfaces';
import { logout } from '../states/actions/authentication';
import { ScrollToTop } from '../atoms/ScrollToTop';

export const NAVBAR_HEIGHT = '80px';

const links = [{ to: '/offers', name: 'Offres' }];

export const Navbar = () => {
  const navigate = useNavigate();
  const [navLinks, setNavLinks] = useState(links);
  const { state, dispatch } = useContext(Store);
  const {
    auth: { token, user },
  } = state;

  const signOut = useCallback(() => {
    logout(dispatch);
    navigate('/login');
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.role.includes(Roles.ROLE_REPRESENTANT)) {
      setNavLinks([
        ...links,
        { to: '/demands', name: 'Demandes' },
        { to: '/my-offers', name: 'Mes offres' },
      ]);
    }
  }, [token, user]);

  return (
    <Container>
      <ScrollToTop />
      <NavContainer>
        <Nav>
          <Link to="/">
            <NavLogo>
              <img src={logo} alt="logo" />
            </NavLogo>
          </Link>
          <NavMenu user={user} links={navLinks} onLogout={signOut} />
        </Nav>
      </NavContainer>
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const NavContainer = styled('div')`
  height: ${NAVBAR_HEIGHT};
  border-bottom: 1px solid #e5e5e5;
`;

const Nav = styled('nav')`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const NavLogo = styled('div')`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
