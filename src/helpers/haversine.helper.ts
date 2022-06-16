export function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d);
}

// Converts numeric degrees to radians
function toRad(value: number) {
  return value * Math.PI / 180;
}

export function nearestPoint(coordinates: [number, number][], point: [number, number]): number {
  const closest = { dist: 0, i: 0 };
  coordinates.forEach((value, index) => {
    const dist = distance(value[1], value[0], point[0], point[1]);
    if (dist < closest.dist || index === 0) {
      closest.dist = dist;
      closest.i = index;
    }
  });

  return closest.i;
}
