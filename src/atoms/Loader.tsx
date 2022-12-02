import { styled } from '@mui/material';
import { BallTriangle } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Container>
      <BallTriangle width="2rem" height="2rem" color="#000" />
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  text-align: center;
`;
