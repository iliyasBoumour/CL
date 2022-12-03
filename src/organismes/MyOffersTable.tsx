import React, { FC } from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';
import { MyOffers } from '../lib/interfaces';
import { Button } from '../atoms/Button';

interface Props {
  deleteOffer: (id: string) => void;
  offers: MyOffers[];
}

export const MyOffersTable: FC<Props> = ({ offers, deleteOffer }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Offre</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers?.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell component="th" scope="row">
                {offer.title}
              </TableCell>
              <TableCell>{offer.description}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => deleteOffer(offer.id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
