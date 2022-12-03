import React, { FC } from 'react';
import {
  Control,
  Controller,
  FieldErrorsImpl,
  FieldValues,
} from 'react-hook-form';
import { TextField } from './TextField';

interface Props {
  name: string;
  type: string;
  control: Control<FieldValues, any>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}

export const ControlledTextField: FC<Props> = ({
  type,
  name,
  control,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: true,
      }}
      render={({ field }) => (
        <TextField
          fullWidth
          id={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          inputProps={{ type }}
          error={Boolean(errors[name])}
          helperText={errors[name] ? 'Champ invalide' : ''}
          {...field}
        />
      )}
    />
  );
};
