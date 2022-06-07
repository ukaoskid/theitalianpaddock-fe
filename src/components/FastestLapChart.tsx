import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';

export const FastestLapChart: React.FC<{ data?: F1DataFastestLapsDto[], loading: boolean }> = (props) => {
  if (props.loading) {
    return <span>loading...</span>
  }

  if (!props.data?.length) {
    return <span>no data</span>
  }

  return (
    <VictoryChart theme={VictoryTheme.material}>
      {props.data.map(record => <VictoryLine
        style={{
          data: { stroke: record.color }
        }}
        data={record.data.map(({ distance, speed }) => ({
          x: distance,
          y: speed
        }))}
      />)}
    </VictoryChart>
  )
};
