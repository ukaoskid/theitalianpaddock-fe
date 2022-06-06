type TMetric = 'Speed' | 'Throttle' | 'Brake' | 'nGear' | 'RPM' | 'DRS';
type TDriver = string[];
type TSession = 'Q' | 'R';
type TComboData = { text: string; value: string | number; }

export type { TMetric, TDriver, TSession, TComboData }
