import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { currentTimePosition } from '../../../utils/charts/chartPlugins';

/**
 * @component
 * Renders a linear chart component for long-term weather data.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.filteredData - The filtered data for the chart.
 * @param {Object} props.options - The options for configuring the chart.
 * @returns {JSX.Element} The linear chart component.
 */
export default function LongTermWeatherLinearChart({ filteredData, options }) {
  return (
    <Line
      data={filteredData}
      plugins={[currentTimePosition]}
      options={options}
    />
  );
}
