import React from 'react';
import { Box, Chip, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

export const MultiSelectCombo: React.FC<{
  data: { text: string; value: string | number; }[],
  label: string,
  id: string,
  value: string[];
  onChange: (value: string | string[]) => void
}> = (props) => {

  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof multipleValue>) => {
    const {
      target: { value },
    } = event;
    setMultipleValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <Select
        multiple
        labelId={`${props.id}-label`}
        id={props.id}
        value={props.value}
        onChange={(event) => props.onChange?.(event.target.value)}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value: any) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {props.data.map(element => <MenuItem value={element.value} key={element.value}>{element.text}</MenuItem>)}
      </Select>
    </div>
  )
}
