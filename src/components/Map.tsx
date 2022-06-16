import React, { useEffect } from 'react';
import { Circle, GeoJSON, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { Button } from '@mui/material';
import { distance } from '../helpers/haversine.helper';
import { Combo } from './Combo';
import { EDITOR_CIRCUITS, JSON_CIRCUITS } from '../models/editor-circuits';
import { TComboData } from '../models/types';
import { LatLngBoundsExpression } from 'leaflet';

const ChangeCenter: React.FC<{ position: LatLngBoundsExpression }> = (props) => {
  const map = useMap();
  map.flyToBounds(props.position, { animate: false });
  map.setZoom(14);
  return <></>;
};

export const Map: React.FC = () => {
  const [valueTurns, setTurns] = React.useState<any>([]);
  const [valueTurnsDistances, setValueTurnsDistances] = React.useState<any>({});
  const [valueCircuit, setCircuit] = React.useState<any>();
  const [valueCircuitGeoJson, setCircuitGeoJson] = React.useState<any>();
  const [valueCircuitCoordinateSeries, setCircuitCoordinateSeries] = React.useState<any>([]);
  const [valueMapCenter, setMapCenter] = React.useState<any>([[0, 0], [0, 0]]);
  const [valueGeoJsonKey, setGeoJsonKey] = React.useState(Date.now().toString())

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

  const circuitsCombo: TComboData[] = EDITOR_CIRCUITS.map<TComboData>(circuit => ({
    text: circuit.name,
    value: circuit.file
  }));

  useEffect(() => {
    const loadGeoJson = async () => {
      if (valueCircuit) {
        const json: any = JSON_CIRCUITS[valueCircuit.replace('.json', '')];
        setCircuitGeoJson(json);
        setCircuitCoordinateSeries(json.features[0].geometry.coordinates);
        setMapCenter([json.bbox[1], json.bbox[0], [json.bbox[3], json.bbox[2]]]);
        setGeoJsonKey(Date.now().toString());
      }
    }

    loadGeoJson();
  }, [valueCircuit]);

  return (
    <div>
      <Combo data={circuitsCombo} label="Circuits" id="circuits" value={valueCircuit}
             onChange={(value: any) => setCircuit(value)}>
      </Combo>
      <Button onClick={calculateTurnDistances}>Calculate</Button>
      <MapContainer center={[0, 0]} zoom={4} scrollWheelZoom={true}>
        <ChangeCenter position={valueMapCenter}></ChangeCenter>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={valueGeoJsonKey}
          attribution="Baku Circuit"
          data={valueCircuitGeoJson}></GeoJSON>
        {valueCircuitCoordinateSeries.map((loc: any, i: number) => (
          <div>
            <Circle center={[loc[1], loc[0]]} radius={4} color="red" eventHandlers={{
              click: (e) => {
                setTurns((currentValue: any) => [...currentValue, i]);
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
