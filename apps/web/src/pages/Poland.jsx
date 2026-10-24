import PolandMap from '@/components/PolandMap';
import ErrorModal from '@/components/ui/modals/ErrorModal';
import Loader from '@/components/ui/Loader';
import { polishCitiesData } from '@/utils/citiesConfig/polishCitiesData';
import { useDataWithMapsHandler } from '@/hooks';

/**
 * @component
 * Poland page: interactive map with voivodeship weather data.
 *
 * @returns {JSX.Element} The rendered Poland page.
 */
export default function PolandPage() {
  // Fetching data for Polish cities.
  const { data, setData } = useDataWithMapsHandler(polishCitiesData);

  return (
    <>
      {data.error && <ErrorModal data={data} setData={setData} />}
      {data.loading && <Loader />}
      {data.fetchedData && <PolandMap fetchedCitiesData={data.fetchedData} />}
    </>
  );
}
