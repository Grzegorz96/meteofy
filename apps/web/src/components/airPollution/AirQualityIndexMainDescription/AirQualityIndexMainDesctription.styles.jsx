import styled from 'styled-components';

/**
 * @component
 * Styled component for wrapping the main description of the air quality index section.
 */
export const AirQualityIndexMainDescriptionWrapper = styled.div`
  max-width: 1050px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  grid-area: airQualityIndexMainDescription;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

/**
 * @component
 * Styled component for displaying text in the main description of the air quality index section.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 * @prop {string} $fontSize - The font size of the text.
 * @prop {string} $marginBottom - The bottom margin of the text.
 */
export const AirQualityIndexMainDescriptionText = styled.h3`
  font-size: ${(props) => props.$fontSize};
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: ${(props) => props.$marginBottom};
  transition: color 0.25s ease-in-out;
`;
