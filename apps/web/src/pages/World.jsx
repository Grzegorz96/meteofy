import WorldGlobe from '../components/world/WorldGlobe/WorldGlobe';
import Loader from '../components/ui/Loader/Loader';
import ErrorModal from '../components/ui/modals/ErrorModal/ErrorModal';
import { worldCapitalsData } from '../utils/citiesConfig/worldCapitalsData';
import { useDataWithMapsHandler } from '../hooks';

/**
 * @component
 * World page: 3D globe with weather for world capitals.
 *
 * @returns {JSX.Element} The rendered World page.
 */
export default function WorldPage() {
  // Fetching data for world capitals.
  const { data, setData } = useDataWithMapsHandler(worldCapitalsData);

  return (
    <>
      {data.error && <ErrorModal data={data} setData={setData} />}
      {data.loading && <Loader />}
      {data.fetchedData && <WorldGlobe fetchedCitiesData={data.fetchedData} />}
    </>
  );
}
