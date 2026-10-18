import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getAirPollutionlinearChartOptions } from '../../../utils/charts/chartOptions';
import { LinearChartWrapper } from './LinearChart.styles';
import { useTheme } from 'styled-components';

/**
 * @component
 * Renders a linear chart for air pollution.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.filteredData - The filtered data for the chart.
 * @returns {JSX.Element} The linear chart component.
 */
export default function AirPollutionLinearChart({ filteredData }) {
  // Get the current theme from styled-components.
  const theme = useTheme();

  return (
    <LinearChartWrapper>
      <Line
        data={filteredData}
        plugins={[ChartDataLabels]}
        options={getAirPollutionlinearChartOptions(theme)}
      />
    </LinearChartWrapper>
  );
}
