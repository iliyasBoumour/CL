import React, { FC } from 'react';
import { OutlinedTextFieldProps } from '@mui/material';
import { Search } from '@mui/icons-material';
import { TextField } from './TextField';

interface Props extends Partial<OutlinedTextFieldProps> {
  value: string;
  handleChange: (value: string) => void;
}

export const SearchField: FC<Props> = ({ value, handleChange, ...props }) => {
  return (
    <TextField
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      InputProps={{
        endAdornment: <Search />,
      }}
      {...props}
    />
  );
};
