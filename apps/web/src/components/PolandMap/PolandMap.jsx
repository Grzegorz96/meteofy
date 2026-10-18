import { useEffect } from 'react';
import {
  PolandMapSVG,
  MapItem,
  WeatherIcon,
  Temp,
  DataWrapper,
  Text,
} from './PolandMap.styles';
import {
  openWeatherModal,
  closeWeatherModal,
} from '../ui/modals/WeatherModal/WeatherModal';
import { polishCitiesData } from '../../utils/citiesConfig/polishCitiesData';
import { useTheme } from 'styled-components';

/**
 * @component
 * Renders a map of Poland with interactive voivodeship paths.
 *
 * @param {Object} props - Component props.
 * @param {Object[]} props.fetchedCitiesData - An array of city data fetched from an API.
 * @returns {JSX.Element} The rendered component.
 */
export default function PolandMap({ fetchedCitiesData }) {
  // Get the current theme from styled-components.
  const theme = useTheme();

  // Close weather modal when theme changes and when unmounting component.
  useEffect(() => {
    return () => {
      closeWeatherModal();
    };
  }, [theme]);

  return (
    <PolandMapSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 440 420"
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        {fetchedCitiesData?.map((currentCity) => {
          const cityData = polishCitiesData.find(
            (polishCity) => polishCity.name === currentCity?.name
          );

          // Render path element for each city if city data is found.
          if (cityData) {
            return (
              <path
                tabIndex={0}
                key={cityData.name}
                title={cityData.title}
                d={cityData.d}
                onClick={() => openWeatherModal(currentCity, theme)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    openWeatherModal(currentCity, theme);
                  }
                }}
              />
            );
          }
        })}
      </g>
      <g>
        {fetchedCitiesData?.map((currentCity) => {
          const cityData = polishCitiesData.find(
            (polishCity) => polishCity.name === currentCity?.name
          );

          // Render weather information for each city if city data is found.
          if (cityData) {
            return (
              <foreignObject
                key={cityData.name}
                style={{
                  pointerEvents: 'none',
                }}
                x={cityData.left}
                y={cityData.top}
                width="65"
                height="55"
              >
                <MapItem>
                  <DataWrapper>
                    <Temp>{Math.round(currentCity?.main?.temp ?? 0)}°</Temp>
                    <WeatherIcon $icon={currentCity?.main?.icon} />
                  </DataWrapper>
                  <Text>{currentCity?.name ?? 'Error'}</Text>
                </MapItem>
              </foreignObject>
            );
          }
        })}
      </g>
    </PolandMapSVG>
  );
}
