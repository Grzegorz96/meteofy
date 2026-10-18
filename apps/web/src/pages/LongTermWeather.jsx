import { useState, useMemo } from 'react';
import ErrorModal from '../components/ui/modals/ErrorModal/ErrorModal';
import Loader from '../components/ui/Loader/Loader';
import SearchEngine from '../components/ui/SearchEngine/SearchEngine';
import { localInputStyles } from '../components/ui/SearchEngine/SearchEngine.styles';
import LongTermWeatherMain from '../components/longTermWeather/LongTermWeatherMain/LongTermWeatherMain';
import { DATA_TYPE } from '../utils/constants';
import { useDataWithCitiesHandler } from '../hooks';

/**
 * @component
 * Long-term weather page: seasonal forecast for a selected city.
 *
 * @returns {JSX.Element} The rendered long-term weather page.
 */
export default function LongTermWeatherPage() {
  // State to store the selected city.
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetching data based on the selected city.
  const { data, setData } = useDataWithCitiesHandler(
    selectedCity,
    DATA_TYPE.longTermWeather
  );

  // Extracting the daily data.
  const daily = data.fetchedData?.daily;

  // Extracting the seasonal data.
  const seasonalData = useMemo(() => {
    if (!daily) return;

    return Object.fromEntries(
      Object.entries(daily).filter(
        ([key]) => key.includes('member01') || key === 'time'
      )
    );
  }, [daily]);

  return (
    <>
      <SearchEngine
        placeholder="Search long term weather by city name"
        city={selectedCity}
        handleOnChange={(selectedOption) => {
          setSelectedCity(selectedOption);
        }}
        styles={localInputStyles}
      />
      {data.error && <ErrorModal data={data} setData={setData} />}
      {data.loading && <Loader />}
      {data.fetchedData?.daily && data.city && (
        <LongTermWeatherMain seasonalData={seasonalData} city={data.city} />
      )}
    </>
  );
}
