import styled from 'styled-components';

/**
 * @component
 * Styled component for displaying air quality index information.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 *
 */
export const AirQualityIndex = styled.div`
  z-index: 1;
  color: ${({ theme }) => theme.textPrimary};
  box-shadow: 0 0 10px 0 ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.secondary};
  transition:
    background-color 0.25s ease-in-out,
    color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  border-radius: 0 6px 6px 0;
  grid-area: airQualityIndex;
  display: grid;
  row-gap: 10px;
  grid-template-areas:
    'airQualityIndexHeader'
    'airQualityIndexDescription'
    'airQualityIndexFooter';

  @media (max-width: 900px) {
    row-gap: 0px;
    border-radius: 6px 6px 0 0;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'airQualityIndexHeader airQualityIndexFooter'
      'airQualityIndexDescription airQualityIndexFooter';
  }

  @media (max-width: 545px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'airQualityIndexHeader'
      'airQualityIndexDescription'
      'airQualityIndexFooter';
  }
`;

/**
 * @component
 * Styled component for the header of the air quality index section.
 *
 * @prop {string} $backqroundColor - The background color of the header.
 */
export const AirQualityIndexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 288px;
  width: 100%;
  height: 100px;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 0 6px 0 0;
  text-align: center;
  transition: background-color 0.5s ease-in-out;
  grid-area: airQualityIndexHeader;

  @media (max-width: 900px) {
    border-radius: 6px 0 0 0;
  }

  @media (max-width: 545px) {
    border-radius: 6px 6px 0 0;
    min-width: auto;
  }
`;

/**
 * @component
 * Styled component for displaying a face image representing air pollution level.
 *
 * @prop {string} $icon - Name of the icon file (without extension) located in the `airPollutionIcons` directory.
 */
export const FaceImg = styled.img.attrs((props) => ({
  src: `/assets/airPollutionIcons/${props.$icon}.svg`,
}))`
  width: 80px;
  height: 80px;
`;

/**
 * @component
 * Styled component for displaying a label with customizable font size and weight.
 *
 * @prop {string} $fontSize - The font size of the label.
 * @prop {string} $fontWeight - The font weight of the label.
 */
export const Label = styled.div`
  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  color: #000000;
`;

/**
 * @component
 * Styled component for wrapping child elements in a flex container with a column direction.
 */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * @component
 * Styled component for displaying a description of the air quality index.
 */
export const AirQualityIndexDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 15px;
  font-size: 14px;
  text-align: center;
  grid-area: airQualityIndexDescription;

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

/**
 * @component
 * Styled component for displaying error information.
 */
export const ErrorInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  text-align: center;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
`;

/**
 * @component
 * Styled component for the footer of the air quality index section.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const AirQualityIndexFooter = styled.div`
  display: grid;
  gap: 5px;
  padding-top: 5px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.textPrimary};
  transition: border-top 0.25s ease-in-out;
  border-radius: 0 0 6px 6px;
  grid-area: airQualityIndexFooter;

  @media (max-width: 900px) {
    border-top: none;
    padding-right: 5px;
  }
`;

/**
 * @component
 * Styled component for displaying a face icon in the footer of the air quality index section.
 * 

 * @prop {string} $icon - Name of the icon file (without extension) located in the `airPollutionIcons` directory.
 * @prop {string} $backqroundColor - Background color for the icon.
 */
export const FaceFooter = styled.img.attrs((props) => ({
  src: `/assets/airPollutionIcons/${props.$icon}.svg`,
}))`
  width: 40px;
  height: 40px;
  padding: 1px;
  border-radius: 50%;
  background-color: ${(props) => props.$backqroundColor};
  margin: auto;
`;

/**
 * @component
 * Styled component for displaying a description in the footer of the air quality index section.
 */
export const FaceFooterDescription = styled.div`
  font-size: 10px;
  text-align: center;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
