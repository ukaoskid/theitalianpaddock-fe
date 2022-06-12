import React from 'react';
import {
  VictoryAxis,
  VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryTheme,
  VictoryVoronoiContainer
} from 'victory';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';
import { TMetric } from '../models/types';
import chartTheme from '../chart.theme';
import { Button, Modal } from '@mui/material';

export const FastestLapTelemetryChart: React.FC<{ data?: F1DataFastestLapsDto[], loading: boolean, metric: TMetric, height: number, title: string }> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (props.loading) {
    return <span>loading...</span>
  }

  if (!props.data?.length) {
    return <span></span>
  }

  const legendData = props.data.map(chart => ({ name: chart.driver }));
  const legendColors = props.data.map(chart => chart.color);

  const chart = (
    <div>
      <Button onClick={handleOpen} hidden={open}>Open</Button>
      <h3>{props.title}</h3>
      <VictoryChart
        height={props.height}
        theme={chartTheme}
        containerComponent={
          <VictoryVoronoiContainer
            mouseFollowTooltips
            voronoiDimension="x"
            labelComponent={<VictoryLabel style={{ fontSize: 7, fill: 'white' }}/>}
            labels={({ datum }) => `${datum.driver}: ${datum.y}`}
          />}
      >
        <VictoryLegend orientation="horizontal"
                       gutter={20}
                       colorScale={legendColors}
                       data={legendData}
        />
        {props.data.map(record => (<VictoryLine
          style={{ data: { stroke: record.color, strokeWidth: 0.5 } }}
          data={record.data.map((metrics) => ({
            x: metrics.distance,
            y: metrics[props.metric],
            driver: record.driver
          }))}
        />))}
        <VictoryAxis fixLabelOverlap label="Distance (m)"/>
        <VictoryAxis fixLabelOverlap dependentAxis label={`${props.metric}`}/>
      </VictoryChart>
    </div>
  );

  return (
    <div>
      {chart}
      <Modal
        open={open}
        onClose={handleClose}
        className="modal"
      >
        {chart}
      </Modal>
    </div>
  )
};
