import React from 'react';
import {
  VictoryAxis,
  VictoryChart, VictoryLabel, VictoryLegend, VictoryLine,
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
  const turns = [185, 519, 1383, 1604, 1942, 1998, 2393, 2588, 2611, 2659, 2685, 2755, 3140, 3351, 3596, 3945, 4119, 4382, 4540, 4887];

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
        {turns.map((turn, i) => {
          const dy = i % 2 === 0 ? -3 : -10;
          return (<VictoryLine
            x={() => turn}
            style={{ data: { stroke: '#ff7961', strokeWidth: 0.5, opacity: '20%' }, labels: { fontSize: 5 }}}
            samples={1}
            labels={['', `${i + 1}`]}
            labelComponent={<VictoryLabel renderInPortal dx={0} dy={dy}/>}
          />)
        })}
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
