/**
 * Generates custom styles for a Select component based on the provided theme.
 *
 * @param {Object} theme - The theme object containing style properties.
 * @returns {Object} An object containing custom styles for the Select component.
 */
export const customSelectStyles = (theme) => ({
  /**
   * Styles for individual options within the Select menu.
   *
   * @param {Object} provided - The default styles provided by the library.
   * @param {Object} state - The current state of the option.
   * @returns {Object} Custom styles for the option.
   */
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    color: state.isSelected ? theme.textPrimary : 'none',
    backgroundColor:
      state.isFocused || state.isSelected
        ? theme.textSecondary
        : provided.backgroundColor,

    ':active': {
      backgroundColor: theme.textSecondary,
    },
  }),
  /**
   * Styles for the Select menu.
   *
   * @param {Object} provided - The default styles provided by the library.
   * @returns {Object} Custom styles for the menu.
   */
  menu: (provided) => ({
    ...provided,
    marginTop: '15px',
    backgroundColor: theme.secondary,
    color: theme.textPrimary,
    border: `1px solid ${theme.textSecondary}`,
    borderRadius: '6px',
    transition:
      'background-color 0.25s ease-in-out, border 0.25s ease-in-out, color 0.25s ease-in-out',
  }),
  /**
   * Styles for the Select control.
   *
   * @param {Object} provided - The default styles provided by the library.
   * @param {Object} state - The current state of the control.
   * @returns {Object} Custom styles for the control.
   */
  control: (provided, state) => ({
    ...provided,
    width: '200px',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: theme.secondary,
    border: 'none',
    boxShadow: `0px ${state.isFocused ? '0px 0px 3px' : '0px 0px 2px'} ${theme.textSecondary}`,
    transition:
      'background-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out',

    '@media (max-width: 768px)': {
      minHeight: 32,
    },
  }),
  /**
   * Styles for the single selected value in the Select.
   *
   * @param {Object} provided - The default styles provided by the library.
   * @returns {Object} Custom styles for the single value.
   */
  singleValue: (provided) => ({
    ...provided,
    color: theme.textPrimary,
    transition: 'color 0.25s ease-in-out',
    fontSize: '16px',
    '@media (max-width: 768px)': {
      fontSize: '14px',
    },
  }),
  /**
   * Styles for the dropdown indicator in the Select.
   *
   * @param {Object} provided - The default styles provided by the library.
   * @returns {Object} Custom styles for the dropdown indicator.
   */
  dropdownIndicator: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      paddingBlock: 0,
    },
  }),
  /**
   * Styles for the clear indicator in the Select.
   *
   * @param {Object} provided - The default styles provided by the library.
   * @returns {Object} Custom styles for the clear indicator.
   */
  clearIndicator: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      paddingBlock: 0,
    },
  }),
});

/**
 * Generates custom styles for the menu of a date range picker based on the provided theme.
 *
 * @param {Object} theme - The theme object containing color configurations.
 * @returns {Object} An object containing custom styles for the menu of the date range picker.
 */
export const dateRangePickerMenu = (theme) => ({
  borderRadius: '6px',
  marginTop: '15px',
  zIndex: 0,
  backgroundColor: theme.secondary,
  border: `1px solid ${theme.textSecondary}`,
  transition: 'background-color 0.25s ease-in-out, border 0.25s ease-in-out',
});
