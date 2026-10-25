import styled from 'styled-components';

/**
 * @component
 * Styled component for wrapping the current air pollution information.
 */
export const CurrentAirPollutionWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'airQualityIndexMainDescription airQualityIndexMainDescription airQualityIndexMainDescription'
    'airPollutionBarChart airPollutionBarChart airQualityIndex'
    'airPollutionBarChart airPollutionBarChart airQualityIndex';

  row-gap: 10px;
  margin-top: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 100%;
    row-gap: 0px;
    grid-template-areas:
      'airQualityIndexMainDescription'
      'airQualityIndex'
      'airPollutionBarChart';
  }
`;
