import React from 'react';
import {
  VictoryAxis,
  VictoryChart, VictoryLabel, VictoryLegend, VictoryLine,
  VictoryVoronoiContainer
} from 'victory';
import { F1DataLapTimesDto } from '../models/f1-data-response.dto';
import chartTheme from '../chart.theme';
import { msToTime } from '../helpers/duration.helper';

export const LapsTimesChart: React.FC<{ data?: F1DataLapTimesDto[], loading: boolean }> = (props) => {
  if (props.loading) {
    return <span>loading...</span>
  }

  if (!props.data?.length) {
    return <span></span>
  }

  const legendData = props.data.map(chart => ({ name: chart.driver }));
  const legendColors = props.data.map(chart => chart.color);

  return (
    <div className="chart-bg">
      <div className="chart">
        <VictoryChart
          height={200}
          theme={chartTheme}
          containerComponent={<VictoryVoronoiContainer mouseFollowTooltips
                                                       voronoiDimension="x"
                                                       labelComponent={<VictoryLabel
                                                         style={{ fontSize: 7, fill: 'white' }}/>}
                                                       labels={({ datum }) => `${datum.driver}: ${msToTime(datum.y)}, ${datum.compound[0]}`}/>}
        >
          <VictoryLegend orientation="horizontal"
                         gutter={20}
                         colorScale={legendColors}
                         data={legendData}
          />
          {props.data.map(record => (<VictoryLine
            style={{ data: { stroke: record.color, strokeWidth: 0.5 } }}
            data={record.data.map((laps) => ({
              x: laps.lap,
              y: laps.time,
              driver: record.driver,
              compound: laps.compound
            }))}
          />))}
          <VictoryAxis fixLabelOverlap label="Laps"/>
          <VictoryAxis fixLabelOverlap dependentAxis label="Time" tickFormat={(t) => msToTime(t)}/>
        </VictoryChart>
      </div>
    </div>
  )
};
