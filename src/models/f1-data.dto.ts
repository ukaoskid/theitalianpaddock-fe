import { TDriver, TMetric } from './types';

export interface F1DataDto {
  year: number;
  track: number;
  session: 'Q' | 'R';
  drivers: TDriver[];
  metrics: TMetric[];
}
