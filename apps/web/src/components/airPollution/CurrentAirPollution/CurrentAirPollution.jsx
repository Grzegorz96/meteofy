import { memo } from 'react';
import { CurrentAirPollutionWrapper } from './CurrentAirPollution.styles';
import AirPollutionBarChart from '../BarChart/BarChart';
import AirQualityIndexLabel from '../AirQualityIndexLabel/AirQualityIndexLabel';
import AirQualityIndexMainDescription from '../AirQualityIndexMainDescription/AirQualityIndexMainDescription';

/**
 * @component
 * Component for displaying the current air pollution information.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.currentAirPollutionData - Data containing current air pollution information.
 * @param {string} props.city - The name of the city for which air pollution data is displayed.
 * @returns {JSX.Element} The JSX element representing the current air pollution information.
 */
function CurrentAirPollution({ currentAirPollutionData, city }) {
  return (
    <CurrentAirPollutionWrapper>
      <AirQualityIndexMainDescription />
      <AirPollutionBarChart
        currentAirPollutionData={currentAirPollutionData}
        city={city}
      />
      <AirQualityIndexLabel currentAirPollutionData={currentAirPollutionData} />
    </CurrentAirPollutionWrapper>
  );
}

const MemoizedCurrentAirPollution = memo(CurrentAirPollution);
export default MemoizedCurrentAirPollution;
