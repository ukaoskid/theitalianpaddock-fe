import ae2009 from '../assets/geojson/ae2009.json';
import at1969 from '../assets/geojson/at1969.json';
import au1953 from '../assets/geojson/au1953.json';
import az2016 from '../assets/geojson/az2016.json';
import be1925 from '../assets/geojson/be1925.json';
import bh2002 from '../assets/geojson/bh2002.json';
import br1940 from '../assets/geojson/br1940.json';
import br1977 from '../assets/geojson/br1977.json';
import ca1978 from '../assets/geojson/ca1978.json';
import cn2004 from '../assets/geojson/cn2004.json';
import de1927 from '../assets/geojson/de1927.json';
import de1932 from '../assets/geojson/de1932.json';
import es1991 from '../assets/geojson/es1991.json';
import fr1960 from '../assets/geojson/fr1960.json';
import fr1969 from '../assets/geojson/fr1969.json';
import gb1948 from '../assets/geojson/gb1948.json';
import hu1986 from '../assets/geojson/hu1986.json';
import it1914 from '../assets/geojson/it1914.json';
import it1922 from '../assets/geojson/it1922.json';
import it1953 from '../assets/geojson/it1953.json';
import jp1962 from '../assets/geojson/jp1962.json';
import mc1929 from '../assets/geojson/mc1929.json';
import mx1962 from '../assets/geojson/mx1962.json';
import my1999 from '../assets/geojson/my1999.json';
import nl1948 from '../assets/geojson/nl1948.json';
import pt1972 from '../assets/geojson/pt1972.json';
import pt2008 from '../assets/geojson/pt2008.json';
import ru2014 from '../assets/geojson/ru2014.json';
import sa2021 from '../assets/geojson/sa2021.json';
import sg2008 from '../assets/geojson/sg2008.json';
import tr2005 from '../assets/geojson/tr2005.json';
import us2012 from '../assets/geojson/us2012.json';

export const JSON_CIRCUITS: any = {
  ae2009,
  at1969,
  au1953,
  az2016,
  be1925,
  bh2002,
  br1940,
  br1977,
  ca1978,
  cn2004,
  de1927,
  de1932,
  es1991,
  fr1960,
  fr1969,
  gb1948,
  hu1986,
  it1914,
  it1922,
  it1953,
  jp1962,
  mc1929,
  mx1962,
  my1999,
  nl1948,
  pt1972,
  pt2008,
  ru2014,
  sa2021,
  sg2008,
  tr2005,
  us2012,
}

export const EDITOR_CIRCUITS = (): { id: string; file: string; name: string; }[] => Object.keys(JSON_CIRCUITS).map((value, index) => {
  return {
    id: value,
    file: `${value}.json`,
    name: `${JSON_CIRCUITS[value].features[0].properties.Location} - ${JSON_CIRCUITS[value].features[0].properties.Name}`
  }
});
