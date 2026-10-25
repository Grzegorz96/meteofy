import styled from 'styled-components';

/**
 * @component
 * Styled component containing current weather information.
 *
 @prop {Object} theme - The theme object containing color configurations.
 */
export const CurrentWeatherWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'main main second'
    'main main second'
    'details details details';
  border-radius: 6px;
  box-shadow: 0 0 10px 0 ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.primary};
  transition:
    background-color 0.25s ease-in-out,
    color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  padding: 15px;
  gap: 10px;
  max-width: 800px;
  width: 100%;

  @media (max-width: 570px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'main'
      'second'
      'details';
  }
`;

/**
 * @component
 * Styled component for a wrapper element.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  transition: background-color 0.25s ease-in-out;
  display: flex;
  border-radius: 4px;
`;

/**
 * @component
 * Styled component extended a wrapper element containing temperature information.
 */
export const TempInfo = styled(Wrapper)`
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

/**
 * @component
 * Styled component extended a wrapper element for main wrapper.
 */
export const MainWrapper = styled(Wrapper)`
  grid-area: main;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  gap: 5px;
`;

/**
 * @component
 * Styled component second wrapper element.
 */
export const SecondWrapper = styled.div`
  grid-area: second;
  display: grid;
  gap: 10px;

  @media (max-width: 570px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 490px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * @component
 * Styled component extended a wrapper element containing sun information.
 */
export const SunInfo = styled(Wrapper)`
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  justify-content: space-evenly;
  align-items: flex-start;
`;

/**
 * @component
 * Styled component for sun items.
 */
export const SunItems = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 5px;
  gap: 5px;
`;

/**
 * @component
 * Styled component for sun value.
 */
export const SunValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px;
`;

/**
 * @component
 * Styled component for details wrapper.
 */
export const DetailsWrapper = styled.div`
  grid-area: details;
  display: grid;
  grid-template-columns: repeat(8, auto);
  gap: 10px;

  @media (max-width: 810px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 570px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/**
 * @component
 * Styled component extended a wrapper element for a detail.
 */
export const Detail = styled(Wrapper)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 5px;
`;

/**
 * @component
 * Styled component for detail value.
 */
export const DetailValue = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  padding: 5px;
`;

/**
 * @component
 * Styled component for weather icon.
 *
 * @prop {string} $icon - The icon name.
 */
export const WeatherIcon = styled.img.attrs((props) => ({
  src: `/assets/visualCrossingWeatherIcons/${props.$icon ?? 'unknown'}.svg`,
}))`
  width: 80px;
  height: 80px;
`;

/**
 * @component
 * Styled component for text.
 *
 * @prop {object} theme - The theme object containing color configurations.
 * @prop {boolean} $isGrey - Indicates whether the text should be grey.
 * @prop {string} $fontWeight - The weight of the text.
 * @prop {string} $fontSize - The size of the text.
 * @prop {string} $lineHeight - The height of the text.
 * @prop {string} $letterSpacing - The spacing of the text.
 */
export const Text = styled.p`
  color: ${(props) => props.$isGrey && props.theme.textSecondary};
  font-weight: ${(props) => props.$fontWeight};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
  letter-spacing: ${(props) => props.$letterSpacing};
  text-align: center;
`;
