import axios from 'axios';
import { IRoundSeasonDrivers, IRoundSeasonSchedule, ISeason, ISeasonCircuits } from '../models/ergast.interface';

const BASE_URL = 'http://ergast.com/api/f1';

class ErgastService {
  getSeasons() {
    return axios.get<ISeason>(`${BASE_URL}/seasons.json?limit=1000`).then((data: any) => {
      data.data.MRData.SeasonTable.Seasons = data.data.MRData.SeasonTable.Seasons.filter((season: { season: string; }) => Number(season.season) >= 2018);
      return data.data.MRData;
    });
  }

  getCircuitsBySeason(year: number) {
    return axios.get<ISeasonCircuits>(`${BASE_URL}/${year}.json?limit=1000`).then((data: any) => data.data.MRData);
  }

  getRoundSeasonSchedule(year: number, round: number) {
    return axios.get<IRoundSeasonSchedule>(`${BASE_URL}/${year}/${round}.json?limit=1000`).then((data: any) => data.data.MRData);
  }

  getDriversByRoundBySeason(year: number, round: number) {
    return axios.get<IRoundSeasonDrivers>(`${BASE_URL}/${year}/drivers.json?limit=1000`).then((data: any) => data.data.MRData);
  }
}

export const ergastService = new ErgastService();
