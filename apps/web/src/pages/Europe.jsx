import EuropeMap from '../components/EuropeMap/EuropeMap';
import ErrorModal from '../components/ui/modals/ErrorModal/ErrorModal';
import Loader from '../components/ui/Loader/Loader';
import { europeCapitalsData } from '../utils/citiesConfig/europeCapitalsData';
import { useDataWithMapsHandler } from '../hooks';

/**
 * @component
 * Europe page: map with weather markers for European capitals.
 *
 * @returns {JSX.Element} The rendered Europe page.
 */
export default function EuropePage() {
  // Fetching data for europe capitals.
  const { data, setData } = useDataWithMapsHandler(europeCapitalsData);

  return (
    <>
      {data.error && <ErrorModal data={data} setData={setData} />}
      {data.loading && <Loader />}
      {data.fetchedData && <EuropeMap fetchedCitiesData={data.fetchedData} />}
    </>
  );
}
