import { useTheme } from 'styled-components';
import { fetchGeoDbCityOptions } from '@/services/api';
import AsyncPaginate from './AsyncPaginate';

const ADDITIONAL = { page: 1 };

const noOptionsMessage = () => 'No cities found';

/**
 * @component
 * Component representing a search engine for selecting cities asynchronously.
 *
 * @param {Object} props - Component props.
 * @param {string} props.placeholder - Placeholder text for the search input.
 * @param {Object|null} props.city - Currently selected city.
 * @param {Function} props.handleOnChange - Function to handle onChange event.
 * @param {Function} props.styles - Function to apply custom styles.
 * @returns {JSX.Element} JSX element representing the search engine.
 */
export default function SearchEngine({
  placeholder,
  city,
  handleOnChange,
  styles,
}) {
  const theme = useTheme();

  return (
    <AsyncPaginate
      menuPortalTarget={document.body}
      placeholder={placeholder}
      debounceTimeout={1000}
      value={city}
      onChange={handleOnChange}
      styles={styles(theme)}
      loadOptions={fetchGeoDbCityOptions}
      additional={ADDITIONAL}
      noOptionsMessage={noOptionsMessage}
      isClearable
    />
  );
}
