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
      <VictoryGroup
        data={props.data[0].data.map(({ distance, speed }) => ({ x: distance, y: speed, driver: props.data?.[0].driver }))}
      >
        <VictoryLine style={{ data: { stroke: props.data[0].color, strokeWidth: 1 } }}/>
      </VictoryGroup>
      <VictoryGroup
        data={props.data[1].data.map(({ distance, speed }) => ({ x: distance, y: speed, driver: props.data?.[1].driver }))}
      >
        <VictoryLine style={{ data: { stroke: props.data[1].color, strokeWidth: 1 } }}/>
      </VictoryGroup>
    </VictoryChart>
  )
};
