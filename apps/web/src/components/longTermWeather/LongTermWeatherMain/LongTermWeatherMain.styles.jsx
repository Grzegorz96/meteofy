import styled from 'styled-components';
import { DateRangePicker } from 'rsuite';

/**
 * @component
 * Styled component for a wrapper element that contains linear chart, select and range date picker.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */

export const LongTermWeatherWrapper = styled.div`
  border-radius: 6px;
  box-shadow: 0 0 10px 0 ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.secondary};
  transition:
    background-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  padding: 10px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  max-width: 1000px;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 50px;
    padding: 10px 10px 5px;
  }
`;

/**
 * @component
 * Styled component for a wrapper element containing input fields.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.textPrimary};
  transition: border-bottom 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for a DateRangePicker component. This component extends the style of the DateRangePicker
 * component and overrides the styles for classes inside it, depending on the theme provided.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const DateRangePickerStyled = styled(DateRangePicker)`
  max-width: 355px;
  width: 100%;
  border: none;

  @media (max-width: 400px) {
    max-width: 264px;
  }

  .rs-input-group {
    height: 38px;
    background-color: ${({ theme }) => theme.secondary};
    border: none;
    outline: none;
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.textSecondary};
    transition:
      background-color 0.25s ease-in-out,
      box-shadow 0.25s ease-in-out;

    @media (max-width: 768px) {
      height: 32px;
    }

    .rs-date-range-input {
      background-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.textPrimary};
      transition:
        background-color 0.25s ease-in-out,
        color 0.25s ease-in-out;
      font-size: 16px;
      border-radius: 6px 0 0 6px;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    .rs-input-group-addon {
      background-color: ${({ theme }) => theme.secondary};
      transition: background-color 0.25s ease-in-out;
      font-size: 16px;
      border-radius: 0 6px 6px 0;

      .rs-icon {
        color: ${({ theme }) => theme.textPrimary};
        transition: color 0.25s ease-in-out;
      }
    }
  }

  .rs-input-group-focus {
    outline: none !important;
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.textSecondary};
  }
`;
