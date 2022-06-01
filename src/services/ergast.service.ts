import axios from 'axios';
import { IRoundSeasonDrivers, IRoundSeasonSchedule, ISeason, ISeasonCircuits } from '../models/ergast.interface';

const BASE_URL = 'http://ergast.com/api/f1';

class ErgastService {
  getSeasons() {
    return axios.get<ISeason>(`${BASE_URL}/seasons.json?limit=1000`);
  }

  getCircuitsBySeason(year: number) {
    return axios.get<ISeasonCircuits>(`${BASE_URL}/${year}/circuits.json?limit=1000`);
  }

  getRoundSeasonSchedule(year: number, round: number) {
    return axios.get<IRoundSeasonSchedule>(`${BASE_URL}/${year}/${round}.json?limit=1000`);
  }

  getDriversByRoundBySeason(year: number, round: number) {
    return axios.get<IRoundSeasonDrivers>(`${BASE_URL}/${year}/${round}/drivers.json?limit=1000`);
  }
}

export const ergastService = new ErgastService();
