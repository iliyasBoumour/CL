import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import { FC } from 'react';

interface Props {
  options: string[];
  onChange: (value: string) => void;
  value: string;
}

export const ToggleButton: FC<Props> = ({ options, onChange, value }) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    onChange(newValue);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {options.map((option) => (
        <MuiToggleButton value={option} aria-label={option}>
          {option}
        </MuiToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
