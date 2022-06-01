import { useEffect, useState } from 'react';
import { ergastService } from '../services/ergast.service';

export const useSelectYear = () => {
  const [options] = useState([]);

  useEffect(() => {
    ergastService.getSeasons()
  }, []);

  return options;
};
