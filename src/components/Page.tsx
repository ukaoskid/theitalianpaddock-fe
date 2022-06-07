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
import { Button } from '@mui/material';

export const Page: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const [valueYear, setValueYear] = React.useState();
  const [valueRound, setValueRound] = React.useState();
  const [valueSession, setValueSession] = React.useState();
  const [valueDrivers, setValueDrivers] = React.useState([]);
  const [valueChart, setValueChart] = React.useState();
  const [valueButton, setValueButton] = React.useState(false);
  // setLoading(true);

  const optionsYear = useSelectYear();
  const optionsRound = useSelectRound(valueYear);
  const optionsSession = useSelectSession(valueYear, valueRound);
  const optionsDrivers = useSelectDrivers(valueYear, valueRound);
  const optionsFastestLap = useFastestLap(valueYear, valueRound, valueSession, valueDrivers, valueButton);
  console.log(valueButton);

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
      <Button onClick={() => setValueButton(true)}>Get data</Button>
      <FastestLapChart loading={false} data={optionsFastestLap?.data}/>
    </div>
  )
};

