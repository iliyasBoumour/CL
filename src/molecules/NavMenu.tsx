import { styled, Menu as MuiMenu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { FC, useCallback, useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { BurgerButton } from '../atoms/BurgerButton';
import { NavButton } from '../atoms/NavButton';
import { useIsTablet } from '../utility/mediaQueries';
import { User } from '../lib/interfaces';

interface Props {
  links: { name: string; to: string }[];
  user: User | null;
  onLogout: () => void;
}

export const NavMenu: FC<Props> = ({ links, user, onLogout }) => {
  const isTablet = useIsTablet();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const handleOpenBurgerMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const showUserMenu = useCallback((e: any) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const closeUserMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const logout = useCallback(() => {
    onLogout();
    setAnchorEl(null);
    handleOpenBurgerMenu();
  }, [handleOpenBurgerMenu, onLogout]);

  return (
    <>
      {isTablet && (
        <BurgerButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      )}
      <Menu isOpen={isOpen}>
        {links.map((link) => (
          <NavButton key={link.name} onClick={handleOpenBurgerMenu}>
            <Link to={link.to}>{link.name}</Link>
          </NavButton>
        ))}
        {user ? (
          <>
            <NavButton
              onClick={showUserMenu}
              endIcon={<KeyboardArrowDownIcon color="inherit" />}
            >
              {user.username}
            </NavButton>
            <MuiMenu
              anchorEl={anchorEl}
              open={openUserMenu}
              onClose={closeUserMenu}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MuiMenu>
          </>
        ) : (
          <NavButton>
            <Link to="/login" onClick={handleOpenBurgerMenu}>
              <PersonOutlineIcon sx={{ cursor: 'pointer' }} />
            </Link>
          </NavButton>
        )}
      </Menu>
    </>
  );
};

export const Menu = styled('div')<{ isOpen: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: all 0.5s ease-in-out;
  @media (max-width: 1024px) {
    position: fixed;
    display: flex;
    background-color: ${(props) => props.theme.palette.background.default};
    z-index: 10;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0px)' : 'translateX(100%)'};
  }
`;
