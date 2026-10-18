import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  0% {
    transform: scale(0.7);
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  33.333% {
    transform: scale(1.05);
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  66.666% {
    transform: scale(0.95);
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  100% {
    transform: scale(1);
  }
`;

/**
 * @component
 * Styled SVG component for the Poland map.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const PolandMapSVG = styled.svg`
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${popIn} 900ms linear forwards;

  path {
    stroke: ${({ theme }) => theme.textSecondary};
    stroke-width: 0.5;
    fill: ${({ theme }) => theme.secondary};
    cursor: pointer;
    outline: none;
    transition:
      fill 0.25s ease-in-out,
      stroke 0.25s ease-in-out;

    &:focus-visible,
    &:hover {
      fill: ${({ theme }) => theme.primary};
      transition: none;
    }
  }
`;

/**
 * @component
 * Styled component for a map item.
 *
 */
export const MapItem = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  gap: 3px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

/**
 * @component
 * Styled component for a wrapper containing data.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const DataWrapper = styled.div`
  background-color: ${({ theme }) => theme.textSecondary + '30'};
  border-radius: 6px;
  padding-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for temperature text.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Temp = styled.span`
  font-weight: bold;
  font-size: 11px;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for text.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Text = styled.span`
  font-weight: bold;
  font-size: 10px;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for weather icon.
 *
 * @prop {string} $icon - The icon name.
 */
export const WeatherIcon = styled.img.attrs((props) => ({
  src: `/assets/openMeteoIcons/${props.$icon ?? 'unknown'}.png`,
}))`
  width: 28px;
`;
