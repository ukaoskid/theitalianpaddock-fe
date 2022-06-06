import { useEffect, useState } from 'react';
import { ergastService } from '../services/ergast.service';
import { IRoundSeasonDrivers } from '../models/ergast.interface';

export const useSelectDrivers = (year: string | undefined, round: string | undefined) => {
  const [options, setOptions] = useState<IRoundSeasonDrivers>();

  useEffect(() => {
    const fetchDrivers = async () => {
      if (year && round) {
        const res = await ergastService.getDriversByRoundBySeason(Number(year), Number(round));
        console.log('sess', res);
        setOptions(res);
      }
    };
    fetchDrivers();
  }, [Number(year), Number(round)]);

  return options;
};
