import React, { useEffect } from 'react';
import { Circle, GeoJSON, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { Button, Select } from '@mui/material';
import { distance } from '../helpers/haversine.helper';
import { Combo } from './Combo';
import { EDITOR_CIRCUITS, JSON_CIRCUITS } from '../models/editor-circuits';
import { TComboData } from '../models/types';

export const Map: React.FC = () => {
  const [valueTurns, setValueTurns] = React.useState<any>([]);
  const [valueTurnsDistances, setValueTurnsDistances] = React.useState<any>({});
  const [valueCircuit, setValueCircuit] = React.useState<any>();
  const [valueCircuitGeoJson, setValueCircuitGeoJson] = React.useState<any>();
  const [valueCircuitCoordinateSeries, setValueCircuitCoordinateSeries] = React.useState<any>([]);
  const [valueMapKey, setValueMapKey] = React.useState<any>([0, 0]);

  const calculateTurnDistances = () => {
    const relativeDistance: any[] = [];
    const absoluteDistance: any[] = [];

    valueTurns.reduce((p: any, c: any) => {
      let cursor = 0;
      let totDistance = 0;
      for (let i = p - 1; i >= c; i--) {
        totDistance += distance(
          valueCircuitCoordinateSeries[p - cursor][1],
          valueCircuitCoordinateSeries[p - cursor][0],
          valueCircuitCoordinateSeries[i][1],
          valueCircuitCoordinateSeries[i][0]
        );
        cursor++;
      }

      relativeDistance.push(totDistance);
      return c;
    });

    let totalDistance = 0;
    relativeDistance.forEach(value => {
      totalDistance += value;
      absoluteDistance.push(totalDistance);
    });

    console.log(absoluteDistance);
  }

  const circuitsCombo: TComboData[] = EDITOR_CIRCUITS.map<TComboData>(circuit => ({ text: circuit.name, value: circuit.file }));

  useEffect(() => {
    const loadGeoJson = async () => {
      if (valueCircuit) {
        const json: any = JSON_CIRCUITS[valueCircuit.replace('.json', '')];
        setValueCircuitGeoJson(json);
        setValueCircuitCoordinateSeries(json.features[0].geometry.coordinates);
        setValueMapKey([json.bbox[0], json.bbox[1]]);
      }
    }

    loadGeoJson();
  }, []);

  return (
    <div>
      <Combo data={circuitsCombo} label={'Circuits'} id={'circuits'} value={valueCircuit}
             onChange={(value: any) => setValueCircuit(value)}>
      </Combo>
      <Button onClick={calculateTurnDistances}>Calculate</Button>
      <MapContainer center={valueMapKey} zoom={16} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={valueMapKey}
          attribution="Baku Circuit"
          data={valueCircuitGeoJson}></GeoJSON>
        {valueCircuitCoordinateSeries.map((loc: any, i: number, array: any[]) => (
          <div>
            <Circle center={[loc[1], loc[0]]} radius={4} color="red" eventHandlers={{
              click: (e) => {
                valueTurns.push(i);
                setValueTurns(valueTurns);
                console.log('marker clicked', valueTurns)
              }
            }}>
              <Popup>{loc[1]}<br/>{loc[0]}<br/>{i}</Popup>
            </Circle>
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
