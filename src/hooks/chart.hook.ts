import { useEffect, useState } from 'react';
import { dataService } from '../services/data.service';
import { TSession } from '../models/types';
import { F1DataFastestLapsDto, F1DataResponseDto } from '../models/f1-data-response.dto';

export const useFastestLap = (year: number | undefined, track: number | undefined, session: TSession | undefined, drivers: string[]) => {
  const [options, setOptions] = useState<F1DataResponseDto<F1DataFastestLapsDto>>();

  useEffect(() => {
    const fetchFastestLap = async () => {
      console.log(year, track, session, drivers);
      if (year && track && session && (drivers?.length > 0)) {
        const res = await dataService.getFastestLaps({
          year,
          track,
          session,
          drivers,
          metrics: ['Speed', 'Throttle']
        })
        console.log('data', res);
        setOptions(res.data);
      }
    };
    fetchFastestLap();
  }, []);

  return options;
};
