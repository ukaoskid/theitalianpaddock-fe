import au1953 from '../assets/geojson/au1953.json';
import az2016 from '../assets/geojson/az2016.json';
import ca1978 from '../assets/geojson/ca1978.json';

export const EDITOR_CIRCUITS: { id: string; file: string; name: string; }[] = [
  { id: 'albert_park', file: 'au1953.json', name: 'Australian GP - Melbourne' },
  { id: 'BAK', file: 'az2016.json', name: 'Azerbaijan GP - Baku' },
  { id: 'BAK', file: 'ca1978.json', name: 'Canadian GP - Gilles Villeneuve' }
]

export const JSON_CIRCUITS: any = {
  au1953,
  az2016,
  ca1978
}
