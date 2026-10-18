import { memo } from 'react';
import DailyWeatherItem from '../DailyWeatherItem/DailyWeatherItem';
import CustomAccordion from '../../ui/Accordion/Accordion';

/**
 * @component
 * Renders the forecast weather component.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.forecastWeather - The array of forecast weather data.
 * @returns {JSX.Element} The forecast weather component.
 */
function ForecastWeather({ forecastWeather }) {
  const listOfScrollContainers = [];

  return (
    <CustomAccordion listOfScrollContainers={listOfScrollContainers}>
      {forecastWeather?.map((dayData, index) => {
        return (
          <DailyWeatherItem
            key={index}
            dayData={dayData}
            listOfScrollContainers={listOfScrollContainers}
          />
        );
      })}
    </CustomAccordion>
  );
}

const MemoizedForecastWeather = memo(ForecastWeather);
export default MemoizedForecastWeather;
