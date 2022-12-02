import React, { FC } from 'react';
import {
  styled,
  TextField as MuiTextField,
  TextFieldProps,
} from '@mui/material';

export const TextField: FC<TextFieldProps> = (props) => {
  return <StyledTextField variant="outlined" color="secondary" {...props} />;
};

const StyledTextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    border-radius: 10px;
  }
  input:-webkit-autofill {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;
