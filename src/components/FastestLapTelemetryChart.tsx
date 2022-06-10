import React from 'react';
import {
  VictoryAxis,
  VictoryChart, VictoryLabel, VictoryLine,
  VictoryVoronoiContainer
} from 'victory';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';
import { TMetric } from '../models/types';
import chartTheme from '../chart.theme';

export const FastestLapTelemetryChart: React.FC<{ data?: F1DataFastestLapsDto[], loading: boolean, metric: TMetric, height: number }> = (props) => {
  if (props.loading) {
    return <span>loading...</span>
  }

  if (!props.data?.length) {
    return <span></span>
  }

  return (
    <VictoryChart
      height={props.height}
      theme={chartTheme}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labelComponent={<VictoryLabel style={{ fontSize: 7, fill: 'white' }}/>}
          labels={({ datum }) => `${datum.driver}: ${datum.y}`}
        />}
    >
      {props.data.map(record => (<VictoryLine
        style={{ data: { stroke: record.color, strokeWidth: 0.5 } }}
        data={record.data.map((metrics) => ({ x: metrics.distance, y: metrics[props.metric], driver: record.driver }))}
      />))}
      <VictoryAxis fixLabelOverlap label="Distance (m)"/>
      <VictoryAxis fixLabelOverlap dependentAxis label={`${props.metric}`}/>
    </VictoryChart>
  )
};
