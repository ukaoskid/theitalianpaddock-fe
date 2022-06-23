import React from 'react';
import { FastestLapTelemetryChart } from './FastestLapTelemetryChart';
import { useSelectYear } from '../hooks/select-year.hook';
import { Combo } from './Combo';
import { driversToCombo, roundsToCombo, seasonsToCombo, sessionsToCombo } from '../helpers/combo.helper';
import { useSelectRound } from '../hooks/select-round.hook';
import { useSelectSession } from '../hooks/select-session.hook';
import { useSelectDrivers } from '../hooks/select-driver.hook';
import { MultiSelectCombo } from './MultiSelectCombo';
import { F1DataFastestLapsDto, F1DataLapTimesDto, F1DataResponseDto } from '../models/f1-data-response.dto';
import { Button, FormControl, Grid } from '@mui/material';
import { dataService } from '../services/data.service';
import { LapsTimesChart } from './LapsTimesChart';

const telemetryLayout: any[][] = [
  [{ metric: 'speed', title: 'Speed' }],
  [{ metric: 'throttle', titleL: 'Throttle' }],
  [{ metric: 'brake', title: 'Brake' }, { metric: 'ngear', title: 'Gear' }],
  [{ metric: 'rpm', title: 'RPM' }, { metric: 'drs', title: 'DRS' }]
]

export const Page: React.FC = () => {
  const [valueLoading, setLoading] = React.useState(false);

  const [valueYear, setValueYear] = React.useState();
  const [valueRound, setValueRound] = React.useState();
  const [valueSession, setValueSession] = React.useState();
  const [valueDrivers, setValueDrivers] = React.useState([]);
  const [valueFastestLaps, setValueFastestLaps] = React.useState<Partial<F1DataResponseDto<F1DataFastestLapsDto>>>({});
  const [valueLapsTimes, setValueLapsTimes] = React.useState<Partial<F1DataResponseDto<F1DataLapTimesDto>>>({});

  const optionsYear = useSelectYear();
  const optionsRound = useSelectRound(valueYear);
  const optionsSession = useSelectSession(valueYear, valueRound);
  const optionsDrivers = useSelectDrivers(valueYear, valueRound);

  const getData = async () => {
    setLoading(true);

    const res = await dataService.getF1Data({
      year: Number(valueYear),
      track: Number(valueRound),
      session: valueSession as any,
      drivers: valueDrivers,
      metrics: ['Speed', 'Throttle', 'Brake', 'RPM', 'nGear', 'RPM', 'DRS']
    })
    const fastestLaps = res.data.find(chart => chart.chart === 'FASTLAPS') as F1DataResponseDto<F1DataFastestLapsDto>;
    const lapsTimes = res.data.find(chart => chart.chart === 'LAPSTIME') as F1DataResponseDto<F1DataLapTimesDto>;

    setValueFastestLaps(fastestLaps);
    setValueLapsTimes(lapsTimes);

    setLoading(false);
  }

  const telemetryCharts: any[] = [];
  telemetryLayout.forEach(row => telemetryCharts.push(...row.map(metric => (
    <Grid item xs={12 / row.length} key={metric.metric}>
      <FastestLapTelemetryChart loading={valueLoading} data={valueFastestLaps?.data} metric={metric.metric} height={200} title={metric.title}/>
    </Grid>
  ))));

  return (
    <div>
      <h1>The Italian Paddock - Telemetry</h1>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} key={'year'}>
          <Combo data={seasonsToCombo(optionsYear)} label="Year" id="year" value={valueYear}
                 onChange={(value: any) => setValueYear(value)}></Combo>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={'round'}>
          <Combo data={roundsToCombo(optionsRound)} label="Round" id="round" value={valueRound}
                 onChange={(value: any) => setValueRound(value)}></Combo>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={'session'}>
          <Combo data={sessionsToCombo(optionsSession)} label="Session" id="session" value={valueSession}
                 onChange={(value: any) => setValueSession(value)}></Combo>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={'driver'}>
          <MultiSelectCombo data={driversToCombo(optionsDrivers)} label="Drivers" id="drivers"
                            value={valueDrivers}
                            onChange={(value: any) => setValueDrivers(typeof value === 'string' ? value.split(',') : value)}></MultiSelectCombo>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={'year'}>
          <FormControl fullWidth>
            <Button onClick={getData}>Get data</Button>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <h2>Laps</h2>
        <Grid item xs={12} key={'lapstimes'}>
          <LapsTimesChart loading={valueLoading} data={valueLapsTimes?.data}/>
        </Grid>
        <h2>Fastest Lap</h2>
        {telemetryCharts}
      </Grid>
    </div>
  )
};

