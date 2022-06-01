export interface F1DataResponseDto<T> {
  chart: string;
  data: T[];
}

export interface F1DataFastestLapsDto {
  driver: string;
  color: string;
  data: [{
    speed: number;
    distance: number;
  }];
}
