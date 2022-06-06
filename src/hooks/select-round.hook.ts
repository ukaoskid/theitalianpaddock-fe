import { useEffect, useState } from 'react';
import { ergastService } from '../services/ergast.service';
import { IRoundSeasonSchedule } from '../models/ergast.interface';

export const useSelectRound = (year: string | undefined) => {
  const [options, setOptions] = useState<IRoundSeasonSchedule>();

  useEffect(() => {
    const fetchRounds = async () => {
      if (year) {
        const res = await ergastService.getCircuitsBySeason(Number(year))
        setOptions(res);
      }
    };
    fetchRounds();
  }, [Number(year)]);

  return options;
};
