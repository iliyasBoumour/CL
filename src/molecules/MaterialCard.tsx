import { FC, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Box, styled, Typography } from '@mui/material';
import { Image } from '../atoms/Image';
import { Button } from '../atoms/Button';
import { useDemandOffer } from '../hooks/useDemandOffer';
import { Offer, Roles } from '../lib/interfaces';

interface Props {
  offer: Offer;
  userRoles: Roles[] | undefined;
}

export const MaterialCard: FC<Props> = ({
  offer: { id, title, description },
  userRoles,
}) => {
  const { requestOffer } = useDemandOffer();
  const { enqueueSnackbar } = useSnackbar();

  const handleDemand = useCallback(async () => {
    const result = await requestOffer(id);
    if (result !== false) {
      enqueueSnackbar('Demande envoyée', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Demande non envoyée', {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, id, requestOffer]);

  return (
    <MaterialContainer>
      <ImageContainer>
        <Image src="https://picsum.photos/200/300" alt={title} />
      </ImageContainer>
      <Content>
        <TextContainer>
          <Typography variant="h5" textTransform="capitalize">
            {title}
          </Typography>
          <Description variant="body1" align="left">
            {description}
          </Description>
        </TextContainer>
        {userRoles?.includes(Roles.ROLE_REPRESENTANT) || (
          <ButtonContainer>
            <Button color="secondary" onClick={handleDemand}>
              Demander
            </Button>
          </ButtonContainer>
        )}
      </Content>
    </MaterialContainer>
  );
};

export const MaterialContainer = styled(Box)`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  height: 18rem;
  gap: 1rem;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
`;

const ImageContainer = styled('div')`
  height: 100%;
  width: 40%;
  overflow: hidden;
  & > img {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

const Content = styled('div')`
  padding: 0.5rem;
  padding-bottom: 0.75rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 60%;
`;

const Description = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  line-clamp: 6;
  -webkit-box-orient: vertical;
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const ButtonContainer = styled('div')`
  margin-left: auto;
`;
