import React from 'react';
import { FastestLapChart } from './FastestLapChart';
import { F1DataFastestLapsDto } from '../models/f1-data-response.dto';
import { dataService } from '../services/data.service';
import { F1DataDto } from '../models/f1-data.dto';

export const Page: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<F1DataFastestLapsDto[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const payload: F1DataDto = {
        year: 2022,
        track: 7,
        session: 'Q',
        drivers: ['LEC', 'VER'],
        metrics: ['Speed', 'Throttle']
      }

      const data = await dataService.getFastestLaps(payload);
      setData(data.data.data);
      setLoading(false);
    };

    getData();
  }, []);
  return <FastestLapChart loading={loading} data={data}/>
};

