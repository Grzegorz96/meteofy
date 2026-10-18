import { POLLUTION_NAMES } from '../constants/pollutionNames';

/**
 * Generates bar chart data for air pollution.
 * @param {Object} currentAirPollutionData - The current air pollution data.
 * @returns {Object} The bar chart data.
 */
export function getAirPollutionBarChartData(currentAirPollutionData) {
  return {
    // Use a predefined array of pollution names as labels for the x-axis.
    labels: POLLUTION_NAMES,
    datasets: [
      {
        // Array of pollution data values corresponding to the pollution names.
        data: [
          currentAirPollutionData?.pm1,
          currentAirPollutionData?.pm2p5,
          currentAirPollutionData?.pm10,
          currentAirPollutionData?.no2,
          currentAirPollutionData?.so2,
          currentAirPollutionData?.co,
          currentAirPollutionData?.o3,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(156, 194, 19, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(156, 194, 19, 1)',
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
}

/**
 * Generates linear chart data for air pollution based on the selected dataset.
 *
 * @param {Object} dayData - The data for a specific day.
 * @param {string} selectedDataset - The selected air pollution dataset.
 * @returns {Object} The chart data object.
 */
export function getAirPollutionFilteredLinearChartData(
  dayData,
  selectedDataset
) {
  return {
    // Generate the labels for the chart from the datetime strings, formatted to show only hours and minutes.
    labels: dayData?.hours?.map(({ datetime }) => datetime?.substring(0, 5)),
    datasets: [
      {
        // Label for the dataset, which is the selected air pollution parameter.
        label: selectedDataset,
        // Generate the data points for the selected air pollution parameter.
        data: dayData?.hours?.map(({ pm1, pm2p5, pm10, no2, so2, co, o3 }) => {
          switch (selectedDataset) {
            case 'PM1':
              return pm1;
            case 'PM2.5':
              return pm2p5;
            case 'PM10':
              return pm10;
            case 'NO2':
              return no2;
            case 'SO2':
              return so2;
            case 'CO':
              return co;
            case 'O3':
              return o3;
            default:
              return null;
          }
        }),
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 3,
        pointHitRadius: 5,
      },
    ],
  };
}

/**
 * Returns the chart data for a long-term weather filtered linear chart.
 *
 * @param {Object} seasonalData - The seasonal data object.
 * @param {Object} selectedDataset - The selected dataset object.
 * @param {Object} theme - The theme object.
 * @returns {Object} The chart data object.
 */
export function getLongTermWeatherFilteredLinearChartData(
  seasonalData,
  selectedDataset,
  theme
) {
  return {
    // Use the time array from seasonalData as labels for the x-axis.
    labels: seasonalData?.time,
    datasets: [
      {
        // Use the label from the selected dataset.
        label: selectedDataset.label,
        // Use the data from seasonalData corresponding to the selected dataset's value.
        data: seasonalData?.[selectedDataset.value]?.map((data) =>
          // Round each data point to the nearest integer.
          Math.round(data)
        ),
        borderWidth: 1.5,
        pointRadius: 1.5,
        pointHoverRadius: 5,
        pointHitRadius: 5,
        borderColor: '#36a2eb',

        // Create a gradient background for the chart.
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }

          // Create a linear gradient from bottom to top.
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.bottom,
            chartArea.left,
            chartArea.top
          );

          // Add color stops to the gradient.
          gradient.addColorStop(0, theme.chartBackgroundStart);
          gradient.addColorStop(1, theme.chartBackgroundEnd);
          return gradient;
        },
        fill: 'start', // Fill the area under the line.
      },
    ],
  };
}
