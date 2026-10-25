import styled from 'styled-components';

/**
 * @component
 * Styled component for wrapping the air pollution bar chart.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const AirPollutionBarChartWrapper = styled.div`
  border-radius: 6px 0 0 6px;
  box-shadow: 0 0 10px 0 ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.secondary};
  transition:
    background-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  grid-area: airPollutionBarChart;
  height: 371px;
  position: relative;
  padding: 10px 12px 12px;

  @media (max-width: 900px) {
    border-radius: 0 0 6px 6px;
    padding: 10px 10px 5px;
  }
`;

/**
 * @component
 * Styled component for displaying datetime information.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Datetime = styled.p`
  position: absolute;
  top: 8px;
  left: 15px;
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.25s ease-in-out;
`;
