import { useEffect, useState } from 'react';
import { dataService } from '../services/data.service';
import { TSession } from '../models/types';
import { F1DataResponseDto } from '../models/f1-data-response.dto';

export const useFastestLap = (year: number | undefined, track: number | undefined, session: TSession | undefined, drivers: string[], submit: boolean) => {
  const [options, setOptions] = useState<F1DataResponseDto[]>([]);

  useEffect(() => {
    const fetchF1Data = async () => {
      if ((year !== undefined) && (track !== undefined) && (session !== undefined) && (drivers?.length > 0) && submit) {
        const res = await dataService.getF1Data({
          year: Number(year),
          track: Number(track),
          session,
          drivers,
          metrics: ['Speed', 'Throttle', 'Brake', 'nGear', 'RPM', 'DRS']
        })
        setOptions(res.data);
      }
    };
    fetchF1Data();
  }, [Number(year), Number(track), session, drivers]);

  return options;
};
