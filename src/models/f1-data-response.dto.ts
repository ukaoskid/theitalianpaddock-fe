export interface F1DataResponseDto<T = unknown> {
  chart: string;
  data: T[];
}

export interface F1DataFastestLapsDto {
  driver: string;
  color: string;
  data: [{
    speed: number;
    distance: number;
    brake: number;
    throttle: number;
    rpm: number;
    ngear: number;
    drs: number;
    driver?: string
  }];
}

export interface F1DataLapTimesDto {
  driver: string;
  color: string;
  data: [{
    time: number;
    lap: number;
    s1: number;
    s2: number;
    s3: number;
    compound: string,
    driver?: string
  }];
}
