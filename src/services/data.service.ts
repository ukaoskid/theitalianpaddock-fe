import { F1DataDto } from '../models/f1-data.dto';
import { F1DataResponseDto } from '../models/f1-data-response.dto';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5588';

class DataService {
  getF1Data(data: F1DataDto) {
    return axios.post<F1DataResponseDto[]>(`${BASE_URL}/data`, data)
  }
}

export const dataService = new DataService();
