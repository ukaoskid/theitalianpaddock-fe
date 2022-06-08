import React from 'react';
import { FastestLapChart } from './FastestLapChart';
import { useSelectYear } from '../hooks/select-year.hook';
import { Combo } from './Combo';
import { driversToCombo, roundsToCombo, seasonsToCombo, sessionsToCombo } from '../helpers/combo.helper';
import { useSelectRound } from '../hooks/select-round.hook';
import { useSelectSession } from '../hooks/select-session.hook';
import { useSelectDrivers } from '../hooks/select-driver.hook';
import { MultiSelectCombo } from './MultiSelectCombo';
import { useFastestLap } from '../hooks/chart.hook';
import { F1DataFastestLapsDto, F1DataResponseDto } from '../models/f1-data-response.dto';
import { Button, Grid, TableRow } from '@mui/material';
import { dataService } from '../services/data.service';
import { TSession } from '../models/types';

export const Page: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const [valueYear, setValueYear] = React.useState();
  const [valueRound, setValueRound] = React.useState();
  const [valueSession, setValueSession] = React.useState();
  const [valueDrivers, setValueDrivers] = React.useState([]);
  const [valueChart, setValueChart] = React.useState<Partial<F1DataResponseDto<F1DataFastestLapsDto>>>({});
  const [valueButton, setValueButton] = React.useState(false);
  // setLoading(true);

  const optionsYear = useSelectYear();
  const optionsRound = useSelectRound(valueYear);
  const optionsSession = useSelectSession(valueYear, valueRound);
  const optionsDrivers = useSelectDrivers(valueYear, valueRound);
  // const optionsFastestLap = useFastestLap(valueYear, valueRound, valueSession, valueDrivers, valueButton);

  const getData = async () => {
    console.log('getting');
    const res = await dataService.getFastestLaps({
      year: Number(valueYear),
      track: Number(valueRound),
      session: valueSession as any,
      drivers: valueDrivers,
      metrics: ['Speed', 'Throttle']
    })
    setValueChart(res.data);
    console.log('done');
  }

  return (
    <div>
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
          <Button onClick={getData}>Get data</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} key={'chart'}>
          <FastestLapChart loading={false} data={valueChart?.data}/>
        </Grid>
      </Grid>
    </div>
  )
};

