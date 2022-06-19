import React, { useEffect } from 'react';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const TurnList: React.FC<{ turns: number[], distances: number[], handleTurns: (turns: number[]) => (any) }> = (props) => {
  const [valueTurns, setTurns] = React.useState<number[]>(props.turns);

  const handleDeleteTurns = async (index: number) => {
    setTurns(value => value.filter((_, i) => index !== i));
  }

  useEffect(() => {
    setTurns(props.turns);
  }, [props.turns]);

  useEffect(() => {
    props.handleTurns(valueTurns);
  }, [valueTurns]);

  return (
    <List>
      {valueTurns.map((turn, index) => (
        <ListItem secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTurns(index)}><DeleteIcon/></IconButton>
        }
        >
          <ListItemText primary={`${index === 0 ? 'Start' : `T${index}`}`}/>
          <ListItemText primary={`${props.distances[index]}m`}/>
        </ListItem>
      ))}
    </List>
  )
}
