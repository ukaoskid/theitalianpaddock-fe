import React from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const MultiSelectCombo: React.FC<{
  data: { text: string; value: string | number; }[],
  label: string,
  id: string,
  value: string[];
  onChange: (value: string | string[]) => void
}> = (props) => {

  return (
    <div>
      <FormControl fullWidth>
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
                <Chip key={value} label={value}/>
              ))}
            </Box>
          )}
        >
          {props.data.map(element => <MenuItem value={element.value} key={element.value}>{element.text}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}
