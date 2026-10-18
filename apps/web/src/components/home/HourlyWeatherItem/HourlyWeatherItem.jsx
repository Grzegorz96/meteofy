import {
  HourlyLabel,
  Label,
  WeatherIcon,
} from '../../ui/Accordion/Accordion.styles';

/**
 * @component
 * Renders an hourly weather item.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.hourData - The data for the hour.
 * @returns {JSX.Element} The rendered HourlyWeatherItem component.
 */
export default function HourlyWeatherItem({ hourData }) {
  return (
    <HourlyLabel>
      <Label>{hourData?.datetime?.substring(0, 5) ?? 'Error'}</Label>
      <Label $fontSize="10px" $fontWeight="600" $height="13px">
        {hourData?.precipprob >= 0.5
          ? `${Math.round(hourData.precipprob)}%`
          : null}
      </Label>
      <WeatherIcon $icon={hourData?.icon} width={'40px'} height={'40px'} />
      <Label>{Math.round(hourData?.temp ?? 0)}°C</Label>
    </HourlyLabel>
  );
}
