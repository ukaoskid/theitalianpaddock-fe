import { useEffect, useState } from 'react';
import { ergastService } from '../services/ergast.service';
import { IRoundSeasonSchedule } from '../models/ergast.interface';

export const useSelectSession = (year: string | undefined, round: string | undefined) => {
  const [options, setOptions] = useState<IRoundSeasonSchedule>();

  useEffect(() => {
    const fetchSessions = async () => {
      if (year && round) {
        const res = await ergastService.getRoundSeasonSchedule(Number(year), Number(round));
        setOptions(res);
      }
    };
    fetchSessions();
  }, [Number(year), Number(round)]);

  return options;
};
