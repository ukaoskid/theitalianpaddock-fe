import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';

export const FastestLapChart: React.FC<{ data: F1DataFastestLapsDto[], loading: boolean }> = (props) => {
  if (props.loading) {
    return <span>loading...</span>
  }

  if (!props.data?.length) {
    return <span>no data</span>
  }

  for (const line in props.data) {

  }

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: props.data[0].color }
        }}
        data={props.data[0].data.map(({ distance, speed }) => ({
          x: distance,
          y: speed
        }))}
      />
      <VictoryLine
        style={{
          data: { stroke: props.data[1].color }
        }}
        data={props.data[1].data.map(({ distance, speed }) => ({
          x: distance,
          y: speed
        }))}
      />
    </VictoryChart>
  )
};
