import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AirPollutionBarChartWrapper, Datetime } from './BarChart.styles';
import { getAirPollutionBarChartData } from '../../../utils/charts/chartData';
import { getAirPollutionBarChartOptions } from '../../../utils/charts/chartOptions';
import { useTheme } from 'styled-components';

/**
 * @component
 * Component for rendering a bar chart displaying air pollution data.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.currentAirPollutionData - Data containing current air pollution information.
 * @param {string} props.city - The name of the city for which air pollution data is displayed.
 * @returns {JSX.Element} The JSX element representing the bar chart.
 */
export default function AirPollutionBarChart({
  currentAirPollutionData,
  city,
}) {
  // Get the current theme from styled-components.
  const theme = useTheme();

  return (
    <AirPollutionBarChartWrapper>
      <Datetime>
        {currentAirPollutionData?.datetime
          ? `Air quality at ${currentAirPollutionData.datetime.substring(0, 5)} local time`
          : 'Error with getting data'}
      </Datetime>
      <Bar
        data={getAirPollutionBarChartData(currentAirPollutionData)}
        plugins={[ChartDataLabels]}
        options={getAirPollutionBarChartOptions(city, theme)}
      />
    </AirPollutionBarChartWrapper>
  );
}
