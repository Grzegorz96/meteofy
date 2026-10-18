import styled from 'styled-components';

/**
 * @component
 * Styled component for displaying weather icons.
 *
 * @prop {string} $icon - The name of the weather icon.
 */
export const WeatherIcon = styled.img.attrs((props) => ({
  src: `/assets/openMeteoIcons/${props.$icon ?? 'unknown'}.png`,
}))`
  width: 100% !important;
`;

/**
 * @component
 * Represents a styled h3 element for temperature.
 */
export const Temp = styled.h3`
  text-align: center;
`;
