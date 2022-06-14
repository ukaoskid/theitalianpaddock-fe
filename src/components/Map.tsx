import React from 'react';
import { Circle, GeoJSON, GeoJSONProps, MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { GeoJsonObject } from 'geojson';
import { Button } from '@mui/material';
import { distance } from '../helpers/haversine.helper';

const BAKU = {
  'type': 'FeatureCollection',
  'name': 'az-2016',
  'bbox': [49.830927, 40.362639, 49.855189, 40.376148],
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'id': 'az-2016',
        'Location': 'Baku',
        'Name': 'Baku City Circuit',
        'opened': 2016,
        'firstgp': 2016,
        'length': 6003,
        'altitude': -25
      },
      'bbox': [49.830927, 40.362639, 49.855189, 40.376148],
      'geometry': {
        'type': 'LineString',
        'coordinates': [[49.853247, 40.372688], [49.851442, 40.372113], [49.848684, 40.371218], [49.847606, 40.370845], [49.844949, 40.369978], [49.84386, 40.369591], [49.842635, 40.3692], [49.84225, 40.369059], [49.841836, 40.368889], [49.841469, 40.368705], [49.838752, 40.367098], [49.838586, 40.366985], [49.838444, 40.366824], [49.838373, 40.366655], [49.838207, 40.365792], [49.83813, 40.365632], [49.837976, 40.365467], [49.836088, 40.364156], [49.835911, 40.363982], [49.835757, 40.363765], [49.835094, 40.362832], [49.834993, 40.362747], [49.834839, 40.362667], [49.83462, 40.362639], [49.834431, 40.362662], [49.834094, 40.362756], [49.833478, 40.362964], [49.831282, 40.363841], [49.831152, 40.363958], [49.831099, 40.364076], [49.830927, 40.365957], [49.830963, 40.366141], [49.831489, 40.367503], [49.831643, 40.367744], [49.831809, 40.367913], [49.832022, 40.368045], [49.833093, 40.368535], [49.834715, 40.369139], [49.835733, 40.369408], [49.835875, 40.369403], [49.83597, 40.369356], [49.836035, 40.369294], [49.836171, 40.368955], [49.836248, 40.368865], [49.836402, 40.368818], [49.836544, 40.368828], [49.836692, 40.368832], [49.836834, 40.368804], [49.837065, 40.368696], [49.837219, 40.368696], [49.837337, 40.368677], [49.837414, 40.368616], [49.838053, 40.367183], [49.838195, 40.367065], [49.838367, 40.36706], [49.838539, 40.36715], [49.838947, 40.367432], [49.841362, 40.368856], [49.841764, 40.369125], [49.841853, 40.369191], [49.841859, 40.369276], [49.841682, 40.369572], [49.841658, 40.369667], [49.841723, 40.369733], [49.842783, 40.370251], [49.84357, 40.370581], [49.844961, 40.371081], [49.845085, 40.371189], [49.845079, 40.371312], [49.84428, 40.372891], [49.84428, 40.373065], [49.84444, 40.373193], [49.846884, 40.374046], [49.849719, 40.375017], [49.851797, 40.37563], [49.853496, 40.376148], [49.853602, 40.376134], [49.853685, 40.376092], [49.854188, 40.37522], [49.854798, 40.374319], [49.855159, 40.373607], [49.855189, 40.37349], [49.855177, 40.373409], [49.855117, 40.373325], [49.855023, 40.373268], [49.853247, 40.372688]]
      }
    }
  ]
}

export const Map: React.FC = () => {
  const [valueTurns, setValueTurns] = React.useState<any>([]);
  const [valueTurnsDistances, setValueTurnsDistances] = React.useState<any>({});

  const calculateTurnDistances = () => {
    const relativeDistance: any[] = [];
    const absoluteDistance: any[] = [];

    valueTurns.reduce((p: any, c: any) => {
      let cursor = 0;
      let totDistance = 0;
      for (let i = p - 1; i >= c; i--) {
        totDistance += distance(coordinates[p - cursor][1], coordinates[p - cursor][0], coordinates[i][1], coordinates[i][0]);
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

  const circuit = BAKU as any;
  const coordinates = circuit.features[0].geometry.coordinates;

  return (
    <div>
      <Button onClick={calculateTurnDistances}>Calculate</Button>
      <MapContainer center={[40.362639, 49.830927]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          attribution="Baku Circuit"
          data={circuit}></GeoJSON>
        {coordinates.map((loc: any, i: number, array: any[]) => (
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
