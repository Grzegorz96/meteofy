import { useState } from 'react';
import Loader from '../components/ui/Loader/Loader';
import ErrorModal from '../components/ui/modals/ErrorModal/ErrorModal';
import SearchEngine from '../components/ui/SearchEngine/SearchEngine';
import CurrentAirPollution from '../components/airPollution/CurrentAirPollution/CurrentAirPollution';
import ForecastAirPollution from '../components/airPollution/ForecastAirPollution/ForecastAirPollution';
import { localInputStyles } from '../components/ui/SearchEngine/SearchEngine.styles';
import { DATA_TYPE } from '../utils/constants';
import { useDataWithCitiesHandler } from '../hooks';

/**
 * @component
 * Air pollution page: current and forecast AQI for a selected city.
 *
 * @returns {JSX.Element} The rendered air pollution page.
 */
export default function AirPollutionPage() {
  // State to store the selected city.
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetching data based on the selected city.
  const { data, setData } = useDataWithCitiesHandler(
    selectedCity,
    DATA_TYPE.airPollution
  );

  return (
    <>
      <SearchEngine
        placeholder="Search AQI by city name"
        city={selectedCity}
        handleOnChange={(selectedOption) => {
          setSelectedCity(selectedOption);
        }}
        styles={localInputStyles}
      />
      {data.error && <ErrorModal data={data} setData={setData} />}
      {data.loading && <Loader />}
      {data.fetchedData?.currentConditions && data.city && (
        <CurrentAirPollution
          currentAirPollutionData={data.fetchedData.currentConditions}
          city={data.city}
        />
      )}
      {data.fetchedData?.days && (
        <ForecastAirPollution
          forecastAirPollutionData={data.fetchedData.days}
        />
      )}
    </>
  );
}
