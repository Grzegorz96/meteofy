import styled, { css } from 'styled-components';
import { Accordion, AccordionItemButton } from 'react-accessible-accordion';

/**
 * @component
 * Styled component for the title.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for displaying weather icons.
 *
 * @prop {string} $icon - The name of the weather icon. Defaults to "unknown" if not provided.
 * @prop {string} width - The width of the icon.
 * @prop {string} height - The height of the icon.
 */
export const WeatherIcon = styled.img.attrs((props) => ({
  src: `/assets/visualCrossingWeatherIcons/${props.$icon ?? 'unknown'}.svg`,
}))`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  ${(props) =>
    props.width === '40px' &&
    css`
      @media (max-width: 550px) {
        width: 30px;
        height: 30px;
      }
    `}
`;

/**
 * @component
 * Styled component for displaying face icons.
 *
 * @prop {string} $icon - The name of the face icon. Defaults to "ic-face-orange" if not provided.
 * @prop {string} $backgroundColor - The background color of the icon.
 */
export const FaceIcon = styled.img.attrs((props) => ({
  src: `/assets/airPollutionIcons/${props.$icon ?? 'ic-face-orange'}.svg`,
}))`
  height: 38px;
  height: 38px;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 6px;
  border: 1px solid black;
  transition: background-color 0.5s ease-in-out;
`;

/**
 * @component
 * Styled component for displaying day information.
 */
export const Day = styled.div`
  flex: 1 1;
  font-weight: 600;

  @media (max-width: 370px) {
    font-size: 10px;
  }
`;

/**
 * @component
 * Styled component for displaying description information.
 */
export const Description = styled.div`
  flex: 1 1;
  text-align: right;

  @media (max-width: 370px) {
    font-size: 10px;
  }
`;

/**
 * @component
 * Styled component for an accordion.
 */
export const StyledAccordion = styled(Accordion)`
  width: 90%;
  max-width: 900px;
`;

/**
 * @component
 * Styled component for a daily details grid.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const DailyDetailsGrid = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  transition: background-color 0.25s ease-in-out;
  grid-row-gap: 0;
  grid-column-gap: 30px;
  row-gap: 0;
  display: grid;
  flex: 1 1;
  grid-template-columns: auto auto;
  padding: 5px 15px;
  margin-inline: 13px;

  @media (max-width: 500px) {
    grid-column-gap: 10px;
  }

  @media (max-width: 400px) {
    grid-template-columns: auto;
  }
`;

/**
 * @component
 * Styled component for a daily details flex container.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const DailyDetailsFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-inline: 13px;
  padding: 5px 0;
  background-color: ${({ theme }) => theme.secondary};
  transition: background-color 0.25s ease-in-out;

  @media (max-width: 600px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

/**
 * @component
 * Styled component for a wrapper containing select buttons.
 */
export const SelectButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-inline: 5px;
`;

/**
 * @component
 * Styled button component for selecting.
 *
 * @prop {boolean} $active - Indicates whether the button is active or not.
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const SelectButton = styled.button`
  background-color: ${({ $active, theme }) => ($active ? theme.textSecondary : theme.textPrimary)};
  color: ${({ $active, theme }) => ($active ? theme.textPrimary : theme.primary)};
  border: 2px solid ${({ theme }) => theme.secondary};
  transition:
    background-color 0.25s ease-in-out,
    color 0.25s ease-in-out,
    border-color 0.25s ease-in-out;
  font-weight: 600;
  padding: 7px;
  border-radius: 10px;
  width: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textPrimary};
  }

  @media (max-width: 600px) {
    font-size: 12px;
    width: 50px;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    width: 40px;
  }
`;

/**
 * @component
 * Styled component for a daily details grid item.
 */
export const DailyDetailsGridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

/**
 * @component
 * Styled component for a label.
 *
 * @prop {boolean} $isGrey - Indicates whether the label should be grey.
 * @prop {string} $fontSize - Font size of the label.
 * @prop {string} $fontWeight - Font weight of the label.
 * @prop {string} $height - Height of the label.
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Label = styled.div`
  color: ${(props) => (props.$isGrey ? props.theme.textSecondary : props.theme.textPrimary)};
  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  height: ${(props) => props.$height};
  text-align: center;
  transition: color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for an accordion item button.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const StyledAccordionItemButton = styled(AccordionItemButton)`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textPrimary};
  transition:
    background-color 0.25s ease-in-out,
    color 0.25s ease-in-out;
  border-radius: 15px;
  height: 40px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 20px;
  gap: 10px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textPrimary};
  }

  @media (max-width: 500px) {
    padding: 5px 10px;
  }

  @media (max-width: 450px) {
    font-size: 12px;
  }

  @media (max-width: 280px) {
    gap: 5px;
  }
`;

/**
 * @component
 * Styled component for an hourly label.
 */
export const HourlyLabel = styled.div`
  min-width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;
