import styled from 'styled-components';

/**
 * @component
 * Styled component for weather icon.
 */
export const WeatherIcon = styled.img.attrs((props) => ({
  src: `/assets/openMeteoIcons/${props.$icon ?? 'unknown'}.png`,
}))``;

/**
 * @component
 * Styled component for the title of the weather modal.
 */
export const Title = styled.p`
  font-size: 30px;
  color: ${({ $theme }) => $theme.textPrimary};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

/**
 * @component
 * Styled component for the paragraph text in the weather modal.
 */
export const Paragraph = styled.p`
  font-size: 18px;
  color: ${({ $theme }) => $theme.textSecondary};
`;

/**
 * @component
 * Styled component for displaying weather information in the modal.
 */
export const WeatherInfo = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: ${({ $theme }) => $theme.textSecondary};
`;

/**
 * @component
 * Styled component for displaying weather information values in the modal.
 */
export const WeatherInfoValue = styled.span`
  font-weight: bold;
  color: ${({ $theme }) => $theme.textPrimary};
`;
