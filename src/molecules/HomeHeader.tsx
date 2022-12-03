import { styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg.jpg';
import { Button } from '../atoms/Button';
import { NAVBAR_HEIGHT } from '../organismes/Navbar';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <ImageContainer>
      <ImageTop>
        <TextContainer>
          <Typography color="primary" textTransform="capitalize" variant="h1">
            Vous n'avez plus besoin d'un matériel&nbsp;?
          </Typography>
          <Typography color="primary" variant="h4">
            Echanger le pour un autre.
          </Typography>
          <Button onClick={() => navigate('/offers')}>Voir les offres</Button>
        </TextContainer>
      </ImageTop>
    </ImageContainer>
  );
};

export const ImageContainer = styled('div')`
  height: calc(100vh - ${NAVBAR_HEIGHT});
  background: url(${bg}) center center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
`;

export const ImageTop = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: start;
  align-items: center;
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  width: 90%;
  color: ${({ theme }) => theme.palette.primary.main};
`;
