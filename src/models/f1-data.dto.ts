export interface F1DataDto {
  year: number;
  track: number;
  session: 'Q' | 'R';
  drivers: string[];
  metrics: string[];
}
