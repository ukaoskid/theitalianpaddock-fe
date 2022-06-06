import { useEffect, useState } from 'react';
import { ergastService } from '../services/ergast.service';
import { ISeason } from '../models/ergast.interface';

export const useSelectYear = () => {
  const [options, setOptions] = useState<ISeason>();

  useEffect(() => {
    const fetchSeasons = async () => {
      const res = await ergastService.getSeasons();
      setOptions(res);
    };
    fetchSeasons();
  }, []);

  return options;
};
