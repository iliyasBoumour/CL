import { useEffect, useState, useContext, useCallback } from 'react';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { styled } from '@mui/material';
import { Store } from '../../states/Store';
import logo from '../../assets/images/logo.png';
import { NavMenu } from '../../molecules/NavMenu';
import { User } from '../../lib/interfaces';
import { logout } from '../../states/actions/authentication';

export const NAVBAR_HEIGHT = '80px';

const links = [{ to: '/', name: 'Offres' }];

export const Navbar = () => {
  const [navLinks, setNavLinks] = useState(links);
  const [currentUser, setcurrentUser] = useState<User | null>(null);
  const { state, dispatch } = useContext(Store);
  const {
    auth: { token },
  } = state;

  const signOut = useCallback(() => {
    logout(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const user = token ? { id: '1', name: 'iliyas' } : null;
    if (!user) {
      return;
    }
    setcurrentUser(user);
    setNavLinks([...links, { to: '/demandes', name: 'Demandes' }]);
  }, [token]);

  return (
    <Container>
      <NavContainer>
        <Nav>
          <NavLogo>
            <img src={logo} alt="logo" />
          </NavLogo>
          <NavMenu user={currentUser} links={navLinks} onLogout={signOut} />
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
