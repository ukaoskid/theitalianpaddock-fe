import React, { useEffect } from 'react';
import { Circle, GeoJSON, MapContainer, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { Button } from '@mui/material';
import { distance, nearestPoint } from '../helpers/haversine.helper';
import { Combo } from './Combo';
import { EDITOR_CIRCUITS, JSON_CIRCUITS } from '../models/editor-circuits';
import { TComboData } from '../models/types';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { TurnList } from './TurnList';

export const Map: React.FC = () => {
  const [valueTurns, setTurns] = React.useState<any[]>([]);
  const [valueTurnsDistances, setValueTurnsDistances] = React.useState<any>({});
  const [valueCircuit, setCircuit] = React.useState<any>();
  const [valueCircuitGeoJson, setCircuitGeoJson] = React.useState<any>();
  const [valueCircuitCoordinateSeries, setCircuitCoordinateSeries] = React.useState<any>([]);
  const [valueCircuitBox, setCircuitBox] = React.useState<any>([[0, 0], [0, 0]]);
  const [valueGeoJsonKey, setGeoJsonKey] = React.useState(Date.now().toString())
  const [valueZoom, setZoom] = React.useState<number>(14);
  const [valueBoxCenter, setBoxCenter] = React.useState<LatLngExpression>();

  const MapEventHandler: React.FC = () => {
    useMapEvents({
      click: event => console.log(nearestPoint(valueCircuitCoordinateSeries, [event.latlng.lat, event.latlng.lng])),
      // zoomend: event => {
      //   setZoom(event.target._zoom);
      //   setBoxCenter(event.target._center);
      // },
      // moveend: event => setBoxCenter(event.target._center)
    })
    return <></>;
  };

  const ChangeCenter: React.FC<{ position: LatLngBoundsExpression, center?: LatLngExpression }> = (props) => {
    const map = useMap();
    map.flyToBounds(props.position, { animate: false });
    map.setZoom(valueZoom);
    // if (props.center) {
    //   console.log('c', props.center);
    //   map.setView(props.center);
    // }
    return <></>;
  };

  const calculateTurnDistances = () => {
    const relativeDistance: any[] = [];
    const absoluteDistance: any[] = [0];

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

    setValueTurnsDistances(absoluteDistance);
  }

  const handleTurnTooltip = (index: number) => {
    const tIndex = valueTurns.indexOf(index);
    if (tIndex !== -1) {
      return (<Tooltip direction="right" offset={[0, 0]} opacity={1}
                       permanent>{`${tIndex === 0 ? 'Start' : `T${tIndex}`}`}</Tooltip>);
    }
  }

  const handleTurnsCopyToClipboard = async () => {
    const text = `[${[...valueTurnsDistances].splice(1, valueTurnsDistances.length).join(', ')}]`;
    await navigator.clipboard.writeText(text);
  }

  const circuitsCombo: TComboData[] = EDITOR_CIRCUITS().map<TComboData>(circuit => ({
    text: circuit.name,
    value: circuit.file
  }));

  // GeoJson loading hook.
  useEffect(() => {
    const loadGeoJson = async () => {
      if (valueCircuit) {
        const json: any = JSON_CIRCUITS[valueCircuit.replace('.json', '')];
        const clockwise = json.features[0].properties.clockwise;
        const coordinates = clockwise ? json.features[0].geometry.coordinates.reverse() : json.features[0].geometry.coordinates;
        setCircuitGeoJson(json);
        setCircuitCoordinateSeries(coordinates);
        setCircuitBox([json.bbox[1], json.bbox[0], [json.bbox[3], json.bbox[2]]]);
        setGeoJsonKey(Date.now().toString());
        setTurns([json.features[0].geometry.coordinates.length - 1]);
      }
    }

    loadGeoJson();
  }, [valueCircuit]);

  // Turns calculation hook.
  useEffect(() => {
    if (valueTurns.length > 0) {
      calculateTurnDistances();
    }
  }, [valueTurns]);

  return (
    <div>
      <Combo data={circuitsCombo} label="Circuits" id="circuits" value={valueCircuit}
             onChange={(value: any) => setCircuit(value)}></Combo>
      <MapContainer center={[0, 0]} scrollWheelZoom={true}>
        <ChangeCenter position={valueCircuitBox} center={valueBoxCenter}></ChangeCenter>
        <MapEventHandler/>
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
            <Circle center={[loc[1], loc[0]]} radius={3} color="red" eventHandlers={{
              click: () => setTurns((currentValue: any) => [...currentValue, i])
            }}>
              {handleTurnTooltip(i)}
            </Circle>
          </div>
        ))}
      </MapContainer>
      <Button
        onClick={handleTurnsCopyToClipboard}>Copy to clipboard</Button>
      <TurnList turns={valueTurns} distances={valueTurnsDistances} handleTurns={turns => {
        console.log('parent', turns);
        setTurns(turns);
      }}></TurnList>
    </div>
  )
}
