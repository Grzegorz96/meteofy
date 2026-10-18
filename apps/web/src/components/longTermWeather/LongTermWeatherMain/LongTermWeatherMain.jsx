import Select from 'react-select';
import {
  LongTermWeatherWrapper,
  InputWrapper,
  DateRangePickerStyled,
} from './LongTermWeatherMain.styles';
import {
  customSelectStyles,
  dateRangePickerMenu,
} from './longTermWeatherMain.helpers';
import 'rsuite/dist/rsuite-no-reset.min.css';
import '../../../assets/CSS/rsuiteStyles/dateRangePickerStyles.css';
import LongTermWeatherLinearChart from '../LinearChart/LinearChart';
import { useState, useMemo, memo } from 'react';
import { getLongTermWeatherFilteredLinearChartData } from '../../../utils/charts/chartData';
import { getLongTermWeatherLinearChartOptions } from '../../../utils/charts/chartOptions';
import { SELECT_OPTIONS } from '../../../utils/constants';
import { API_DATA } from '../../../utils/constants/api/openMeteoApiData';
import { getDefaultDateRange, getRanges } from '../../../utils/helpers';
import { startOfDay, addDays, subDays } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'styled-components';

/**
 * @component
 * Renders the main component for displaying long-term weather data.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.seasonalData - The seasonal weather data.
 * @param {string} props.city - The name of the city.
 * @returns {JSX.Element} The rendered component.
 */
function LongTermWeatherMain({ seasonalData, city }) {
  // Get the current theme from styled-components.
  const theme = useTheme();
  // Check if the screen width is less than 400px.
  const moveRangesToBottom = useMediaQuery({ query: '(max-width: 400px)' });
  // Check if the screen width is less than 768px.
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // Set the default selected dataset and date range.
  const [selectedDataset, setSelectedDataset] = useState(SELECT_OPTIONS[0]);
  const [selectedDateRange, setSelectedDateRange] =
    useState(getDefaultDateRange);

  // Function to set the selected dataset.
  const changeDateRange = (value) => {
    if (value) {
      setSelectedDateRange(value);
    } else {
      setSelectedDateRange(getDefaultDateRange);
    }
  };

  // Get the filtered data and options for the linear chart.
  const filteredData = useMemo(
    () =>
      getLongTermWeatherFilteredLinearChartData(
        seasonalData,
        selectedDataset,
        theme
      ),
    [seasonalData, selectedDataset, theme]
  );

  // Get the options for the linear chart.
  const options = useMemo(
    () =>
      getLongTermWeatherLinearChartOptions(
        selectedDataset,
        selectedDateRange,
        city,
        theme
      ),
    [selectedDataset, selectedDateRange, city, theme]
  );

  return (
    <LongTermWeatherWrapper>
      <InputWrapper>
        <Select
          styles={customSelectStyles(theme)}
          options={SELECT_OPTIONS}
          onChange={setSelectedDataset}
          value={selectedDataset}
          isSearchable={false}
        />
        <DateRangePickerStyled
          editable={isMobile ? false : true}
          menuStyle={dateRangePickerMenu(theme)}
          menuClassName={theme.isDarkMode ? 'dark-mode-menu' : null}
          placement="bottom"
          showOneCalendar
          character=" - "
          ranges={getRanges(moveRangesToBottom)}
          format="MMMM dd, yyyy"
          value={selectedDateRange}
          onChange={changeDateRange}
          shouldDisableDate={(date) => {
            const firstDay = startOfDay(
              subDays(new Date(), API_DATA.seasonal.pastDays)
            );
            const lastDay = startOfDay(
              addDays(new Date(), API_DATA.seasonal.forecastDays - 1)
            );

            return date < firstDay || date > lastDay;
          }}
        />
      </InputWrapper>
      <LongTermWeatherLinearChart
        filteredData={filteredData}
        options={options}
      />
    </LongTermWeatherWrapper>
  );
}

const MemoizedLongTermWeatherMain = memo(LongTermWeatherMain);
export default MemoizedLongTermWeatherMain;
