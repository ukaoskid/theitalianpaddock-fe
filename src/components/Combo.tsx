import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Combo: React.FC<{
  data: { text: string; value: string | number; }[],
  label: string,
  id: string,
  value: any,
  onChange?: (value: string) => void
}> = (props) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
        <Select
          autoWidth
          labelId={`${props.id}-label`}
          id={props.id}
          value={props.value}
          onChange={(event) => props.onChange?.(event.target.value)}
        >
          {props.data.map(element => <MenuItem value={element.value} key={element.value}>{element.text}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}
