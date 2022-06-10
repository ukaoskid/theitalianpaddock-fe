import { IRoundSeasonDrivers, IRoundSeasonSchedule, ISeason } from '../models/ergast.interface';
import { TComboData } from '../models/types';

export function seasonsToCombo(seasons: ISeason | undefined): TComboData[] {
  const comboData: TComboData[] = [];
  if (seasons && seasons.SeasonTable) {
    comboData.push(...seasons.SeasonTable.Seasons.map(season => {
      return { value: season.season, text: season.season }
    }))
  }
  comboData.push({ text: '...', value: '0' });
  return comboData.reverse()
}

export function roundsToCombo(rounds: IRoundSeasonSchedule | undefined): TComboData[] {
  const comboData: TComboData[] = [{ text: '...', value: '0' }];
  if (rounds && rounds.RaceTable) {
    comboData.push(...rounds.RaceTable.Races.map(round => {
      return { value: String(round.round), text: round.raceName }
    }))
  }
  return comboData
}

export function sessionsToCombo(sessions: IRoundSeasonSchedule | undefined): TComboData[] {
  const comboData: TComboData[] = [{ text: '...', value: '0' }];
  if (sessions && sessions.RaceTable) {
    if (sessions.RaceTable.Races[0].FirstPractice) {
      comboData.push({ value: 'FP1', text: 'FP1' })
    }
    if (sessions.RaceTable.Races[0].SecondPractice) {
      comboData.push({ value: 'FP2', text: 'FP2' })
    }
    if (sessions.RaceTable.Races[0].ThirdPractice) {
      comboData.push({ value: 'FP3', text: 'FP3' })
    }
    if (sessions.RaceTable.Races[0].Qualifying) {
      comboData.push({ value: 'Q', text: 'Q' })
    }
    if (sessions.RaceTable.Races[0].Sprint) {
      comboData.push({ value: 'SR', text: 'SR' })
    }
    comboData.push({ value: 'R', text: 'R' })
  }
  return comboData
}

export function driversToCombo(drivers: IRoundSeasonDrivers | undefined): TComboData[] {
  const comboData: TComboData[] = [{ text: '...', value: '0' }];
  if (drivers && drivers.DriverTable) {
    comboData.push(...drivers.DriverTable.Drivers.map(driver => {
      return { value: String(driver.code), text: driver.code }
    }));
  }
  return comboData
}
