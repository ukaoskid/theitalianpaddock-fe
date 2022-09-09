import React from 'react';
import {
  VictoryAxis,
  VictoryChart, VictoryCursorContainer, VictoryLabel, VictoryLegend, VictoryLine,
  VictoryVoronoiContainer
} from 'victory';
import {F1DataFastestLapsDto} from '../models/f1-data-response.dto';
import {TMetric} from '../models/types';
import chartTheme from '../chart.theme';
import {Button, Modal} from '@mui/material';

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

  const legendData = props.data.map(chart => ({name: chart.driver}));
  const legendColors = props.data.map(chart => chart.color);
  const turns: any[] = [216, 607, 766, 903, 1132, 1259, 1347, 1433, 1801, 2098, 2150, 2380, 2545, 2574, 2699, 2730, 2856, 2920, 3012]

  const chart = (
    <div>
      <Button onClick={handleOpen} hidden={open}>Open</Button>
      <h3>{props.title}</h3>
      <div className="chart-bg">
        <div className="chart">
          <VictoryChart
            height={props.height}
            theme={chartTheme}
            containerComponent={
              <VictoryCursorContainer
                cursorDimension="x"
                cursorLabelComponent={<VictoryLabel style={{fontSize: 7, fill: 'white'}}/>}
                cursorLabel={({ datum }) => `${Math.round(datum.x)}`}
              />
            }
            // containerComponent={
            //   <VictoryVoronoiContainer
            //     mouseFollowTooltips
            //     voronoiDimension="x"
            //     voronoiPadding={5}
            //     labelComponent={<VictoryLabel style={{fontSize: 7, fill: 'white'}}/>}
            //     labels={({datum}) => `${datum.driver}: ${datum.y}`}
            //   />}
          >
            <VictoryLegend orientation="horizontal"
                           gutter={20}
                           colorScale={legendColors}
                           data={legendData}
            />
            {props.data.map((record, i) => {
              return (<VictoryLine
                // interpolation="cardinal"
                style={{data: {stroke: record.color, strokeWidth: 0.5}}}
                data={record.data.map((metrics) => ({
                  x: metrics.distance,
                  y: metrics[props.metric],
                  driver: record.driver
                }))}
              />)
            })}
            {turns.map((turn, i) => {
              const dy = i % 2 === 0 ? -3 : -10;
              return (<VictoryLine
                x={() => turn}
                style={{data: {stroke: '#ff7961', strokeWidth: 0.5, opacity: '20%'}, labels: {fontSize: 5}}}
                samples={1}
                labels={['', `${i + 1}`]}
                labelComponent={<VictoryLabel renderInPortal dx={0} dy={dy}/>}
              />)
            })}
            <VictoryAxis fixLabelOverlap label="Distance (m)"/>
            <VictoryAxis fixLabelOverlap dependentAxis label={`${props.metric}`}/>
          </VictoryChart>
        </div>
      </div>
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
