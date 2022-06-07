import React from 'react';
import { FastestLapChart } from './FastestLapChart';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';
import { dataService } from '../services/data.service';
import { F1DataDto } from '../models/f1-data.dto';
import { Button, FormControl } from '@mui/material';
import { useSelectYear } from '../hooks/select-year.hook';
import { Combo } from './Combo';
import { driversToCombo, roundsToCombo, seasonsToCombo, sessionsToCombo } from '../helpers/combo.helper';
import { useSelectRound } from '../hooks/select-round.hook';
import { useSelectSession } from '../hooks/select-session.hook';
import { useSelectDrivers } from '../hooks/select-driver.hook';
import { MultiSelectCombo } from './MultiSelectCombo';
import { useFastestLap } from '../hooks/chart.hook';

export const Page: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const [valueYear, setValueYear] = React.useState();
  const [valueRound, setValueRound] = React.useState();
  const [valueSession, setValueSession] = React.useState();
  const [valueDrivers, setValueDrivers] = React.useState([]);
  const [valueChart, setValueChart] = React.useState();
  // setLoading(true);7890''ì

  const optionsYear = useSelectYear();
  const optionsRound = useSelectRound(valueYear);
  const optionsSession = useSelectSession(valueYear, valueRound);
  const optionsDrivers = useSelectDrivers(valueYear, valueRound);
  const optionsFastestLap = useFastestLap(valueYear, valueRound, valueSession, valueDrivers);
  // <FastestLapChart loading={loading} data={data}/>

  return (
    <div>
      <Combo data={seasonsToCombo(optionsYear)} label="Year" id="year" value={valueYear}
             onChange={(value: any) => setValueYear(value)}></Combo>
      <Combo data={roundsToCombo(optionsRound)} label="Round" id="round" value={valueRound}
             onChange={(value: any) => setValueRound(value)}></Combo>
      <Combo data={sessionsToCombo(optionsSession)} label="Session" id="session" value={valueSession}
             onChange={(value: any) => setValueSession(value)}></Combo>
      <MultiSelectCombo data={driversToCombo(optionsDrivers)} label="Drivers" id="drivers"
                        value={valueDrivers}
                        onChange={(value: any) => setValueDrivers(typeof value === 'string' ? value.split(',') : value)}></MultiSelectCombo>
    </div>
  )
};

