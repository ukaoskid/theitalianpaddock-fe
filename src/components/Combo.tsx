import React from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';

export const Combo: React.FC<{ data: { text: string; value: string | number; }[], label: string, id: string }> = (props) => {
  const menuItems = [];
  for (const element of props.data) {
    menuItems.push(<MenuItem value={element.value}>{element.text}</MenuItem>);
  }

  return (
    <div>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        id={props.id}
        value="..."
        label="Age"
        // onChange={handleChange}
      >
        {menuItems}
      </Select>
    </div>
  )
}
