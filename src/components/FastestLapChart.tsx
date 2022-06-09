import React from 'react';
import {
  VictoryChart, VictoryGroup, VictoryLine,
  VictoryScatter,
  VictoryTheme, VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';

export const FastestLapChart: React.FC<{ data?: F1DataFastestLapsDto[], loading: boolean }> = (props) => {
  if (props.loading) {
    return <span>loading...</span>
  }

  if (!props.data?.length) {
    return <span>no data</span>
  }

  return (
    <VictoryChart
      domain={{ y: [0, 400] }}
      theme={VictoryTheme.material}
      containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${datum.driver}: ${datum.y}`}/>}
    >
      {props.data.map(record => (<VictoryLine
        style={{ data: { stroke: record.color, strokeWidth: 0.5 }}}
        data={record.data.map(({ distance, speed, driver }) => ({ x: distance, y: speed, driver: record.driver }))}
      />))}
    </VictoryChart>
  )
};
