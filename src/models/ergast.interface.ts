export interface IDriver {
  driverId: string,
  permanentNumber: string,
  code: string,
  url: string,
  givenName: string,
  familyName: string,
  dateOfBirth: string,
  nationality: string
}

export interface ICircuit {
  circuitId: string,
  url: string,
  circuitName: string,
  Location: {
    lat: string,
    long: string,
    locality: string,
    country: string
  };
}

export interface ISeason {
  SeasonTable: {
    Seasons: [{ season: string; url: string }];
  };
}

export interface ISeasonCircuits {
  CircuitTable: {
    season: string,
    Circuits: ICircuit[];
  }
}

export interface IRoundSeasonDrivers {
  DriverTable: {
    season: string,
    round: string,
    Drivers: IDriver[];
  }
}

export interface IRoundSeasonSchedule {
  RaceTable: {
    season: string,
    round: string,
    Races: [
      {
        season: string,
        round: string,
        url: string,
        raceName: string,
        Circuit: ICircuit,
        date: string,
        time: string,
        FirstPractice: {
          date: string,
          time: string
        },
        Qualifying: {
          date: string,
          time: string
        },
        SecondPractice: {
          date: string,
          time: string
        },
        ThirdPractice: {
          date: string,
          time: string
        },
        Sprint: {
          date: string,
          time: string
        }
      }
    ]
  }
}
