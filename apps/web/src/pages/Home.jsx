import { useSelector } from 'react-redux';
import CurrentWeather from '../components/home/CurrentWeather/CurrentWeather';
import ForecastWeather from '../components/home/ForecastWeather/ForecastWeather';
import Loader from '../components/ui/Loader/Loader';
import ErrorModal from '../components/ui/modals/ErrorModal/ErrorModal';
import { DATA_TYPE } from '../utils/constants';
import { useDataWithCitiesHandler } from '../hooks';

/**
 * @component
 * Home page: current and forecast weather for the selected city.
 *
 * @returns {JSX.Element} The rendered home page.
 */
export default function HomePage() {
  // Fetching city data from Redux store
  const cityData = useSelector(({ cityData }) => cityData);

  // Fetching weather data based on the selected city.
  const { data, setData } = useDataWithCitiesHandler(
    cityData,
    DATA_TYPE.weather
  );

  return (
    <>
      {data.error && <ErrorModal data={data} setData={setData} />}
      {data.loading && <Loader />}
      {data.fetchedData?.currentConditions && data.city && (
        <CurrentWeather
          currentWeather={data.fetchedData.currentConditions}
          city={data.city}
        />
      )}
      {data.fetchedData?.days && (
        <ForecastWeather forecastWeather={data.fetchedData.days} />
      )}
    </>
  );
}
