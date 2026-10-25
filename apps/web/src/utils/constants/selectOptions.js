/**
 * Array of select options.
 * @typedef {Object} SelectOption
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 * @property {string} unit - The unit of measurement for the option.
 */

/**
 * Array of select options.
 * @type {SelectOption[]}
 */
export const SELECT_OPTIONS = [
  {
    value: 'temperature_2m_max_member01',
    label: 'Max temperature',
    unit: '°C',
  },
  {
    value: 'temperature_2m_min_member01',
    label: 'Min temperature',
    unit: '°C',
  },
  {
    value: 'wind_speed_10m_max_member01',
    label: 'Max wind speed',
    unit: 'km/h',
  },
  {
    value: 'precipitation_sum_member01',
    label: 'Precipitation',
    unit: 'mm',
  },
];
