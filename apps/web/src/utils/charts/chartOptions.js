/**
 * Returns the chart options for the air pollution bar chart.
 *
 * @param {string} city - The city for which the chart is generated.
 * @param {object} theme - The theme object containing colors for styling the chart.
 * @returns {object} The chart options object.
 */
export function getAirPollutionBarChartOptions(city, theme) {
  return {
    // Configuration of plugins for the chart.
    plugins: {
      // Configuration of tooltips.
      tooltip: {
        callbacks: {
          title: function () {
            return `${'Air Pollution Data:'}`;
          },
          label: function (context) {
            return `${context.label}: ${context.parsed.y} μg/m³`;
          },
        },
        // Styling of the tooltip appearance.
        backgroundColor: theme.tooltip,
        titleColor: theme.primary,
        bodyColor: theme.primary,
      },
      // Hiding the legend.
      legend: {
        display: false,
      },
      // Configuration of the chart title.
      title: {
        display: true,
        text: city,
        font: {
          size: 20,
        },
        color: theme.textPrimary,
      },
      // Configuration of data labels.
      datalabels: {
        anchor: 'end',
        align: 'top',
        clamp: true,
        font: {
          weight: 'bold',
          size: 12,
        },
        color: theme.textSecondary,
        offset: 0,
        formatter: function (value) {
          return value ?? 'NA';
        },
      },
    },
    // Configuration of chart axes.
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value} μg/m³`;
          },
          color: theme.textSecondary,
        },
      },
      x: {
        ticks: {
          color: theme.textSecondary,
        },
      },
    },
    // Configuration for chart responsiveness and maintaining aspect ratio.
    responsive: true,
    maintainAspectRatio: false,
    // Setting padding for the chart.
    layout: {
      padding: {
        top: 3,
      },
    },
  };
}

/**
 * Returns the chart options for an air pollution linear chart.
 *
 * @param {Object} theme - The theme object containing colors for styling the chart.
 * @returns {Object} The chart options object.
 */
export const getAirPollutionlinearChartOptions = (theme) => {
  return {
    // Layout configuration for the chart.
    layout: {
      padding: {
        top: 15,
      },
    },
    // Configuration of plugins for the chart.
    plugins: {
      // Configuration of tooltips.
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} μg/m³`;
          },
        },
        // Styling of the tooltip appearance.
        backgroundColor: theme.tooltip,
        titleColor: theme.primary,
        bodyColor: theme.primary,
      },
      // Hiding the legend.
      legend: {
        display: false,
      },
      // Configuration of data labels.
      datalabels: {
        anchor: 'end',
        align: 'top',
        clamp: true,
        font: {
          weight: 'bold',
          size: 12,
        },
        offset: -3,
      },
    },
    // Configuration of chart axes.
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.textSecondary,
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
          },
          color: theme.textSecondary,
        },
      },
    },
    // Configuration for chart responsiveness and maintaining aspect ratio.
    responsive: true,
    maintainAspectRatio: false,
  };
};

/**
 * Returns the chart options for a long-term weather linear chart.
 *
 * @param {Object} selectedDataset - The selected dataset for the chart.
 * @param {Array} selectedDateRange - The selected date range for the chart.
 * @param {string} city - The city for which the chart is generated.
 * @param {Object} theme - The theme object for styling the chart.
 * @returns {Object} The chart options object.
 */
export function getLongTermWeatherLinearChartOptions(
  selectedDataset,
  selectedDateRange,
  city,
  theme
) {
  return {
    // Configuration for line tension.
    tension: 0.4,
    // Configuration for responsiveness.
    responsive: true,
    // Configuration for maintaining aspect ratio.
    maintainAspectRatio: true,
    // Configuration for chart scales.
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `${value}${
              selectedDataset.unit === '°C'
                ? selectedDataset.unit
                : ' ' + selectedDataset.unit
            }`;
          },
          color: theme.textSecondary,
        },
        beginAtZero: true,
      },
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'MMMM d, yyyy',
        },
        beginAtZero: true,
        ticks: {
          color: theme.textSecondary,
        },
        // Setting the minimum value of the x-axis to the start of the selected date range.
        min: selectedDateRange[0],
        // Setting the maximum value of the x-axis to the end of the selected date range.
        max: selectedDateRange[1],
      },
    },
    // Configuration for chart plugins.
    plugins: {
      // Configuration for chart title.
      title: {
        display: true,
        text: `${selectedDataset.label} in ${city}`,
        font: {
          size: 20,
        },
        color: theme.textPrimary,
      },
      // Configuration for tooltips.
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}${
              selectedDataset.unit === '°C'
                ? selectedDataset.unit
                : ' ' + selectedDataset.unit
            }`;
          },
        },
        backgroundColor: theme.tooltip,
        titleColor: theme.primary,
        bodyColor: theme.primary,
      },
      // Hide the legend.
      legend: {
        display: false,
      },
      // Configuration for displaying current time position plugin.
      currentTimePosition: {
        lineThickness: 1,
        color: theme.textPrimary,
      },
    },
  };
}
