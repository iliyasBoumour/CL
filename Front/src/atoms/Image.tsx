import { FC } from 'react';
import { styled } from '@mui/material';

interface Props {
  src: string;
  alt: string;
}

export const Image: FC<Props> = ({ src, alt }) => {
  return <Img src={src} alt={alt} />;
};

const Img = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
