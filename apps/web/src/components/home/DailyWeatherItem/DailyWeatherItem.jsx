import {
  StyledAccordionItemButton,
  WeatherIcon,
  Day,
  Description,
  DailyDetailsGrid,
  DailyDetailsGridItem,
  Label,
} from '../../ui/Accordion/Accordion.styles';
import {
  AccordionItem,
  AccordionItemPanel,
  AccordionItemHeading,
} from 'react-accessible-accordion';
import ScrollContainer from '../../ui/ScrollContainer/ScrollContainer';
import HourlyWeatherItem from '../HourlyWeatherItem/HourlyWeatherItem';
import { format } from 'date-fns';

/**
 * @component
 * Renders a daily weather item component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.dayData - The data for the day.
 * @param {Array} props.listOfScrollContainers - List of scrollable containers.
 * @returns {JSX.Element} The rendered DailyWeatherItem component.
 */
export default function DailyWeatherItem({ dayData, listOfScrollContainers }) {
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <StyledAccordionItemButton>
          <WeatherIcon $icon={dayData?.icon} width={'30px'} height={'30px'} />
          <Day>
            {dayData?.datetime
              ? format(dayData.datetime, 'MM-dd EEEE')
              : 'Error'}
          </Day>
          <Description>{dayData?.conditions ?? 'Error'}</Description>
          <Label $isGrey>
            {Math.round(dayData?.tempmax ?? 0)}°C/
            {Math.round(dayData?.tempmin ?? 0)}°C
          </Label>
        </StyledAccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <DailyDetailsGrid>
          <DailyDetailsGridItem>
            <Label $isGrey>Feels like:</Label>
            <Label>{Math.round(dayData?.feelslike ?? 0)}°C</Label>
          </DailyDetailsGridItem>
          <DailyDetailsGridItem>
            <Label $isGrey>Pressure:</Label>
            <Label>{Math.round(dayData?.pressure ?? 0)} hPa</Label>
          </DailyDetailsGridItem>
          <DailyDetailsGridItem>
            <Label $isGrey>Humidity:</Label>
            <Label>{Math.round(dayData?.humidity ?? 0)}%</Label>
          </DailyDetailsGridItem>
          <DailyDetailsGridItem>
            <Label $isGrey>Clouds:</Label>
            <Label>{Math.round(dayData?.cloudcover ?? 0)}%</Label>
          </DailyDetailsGridItem>
          <DailyDetailsGridItem>
            <Label $isGrey>Wind speed:</Label>
            <Label>{Math.round(dayData?.windspeed ?? 0)} km/h</Label>
          </DailyDetailsGridItem>
          <DailyDetailsGridItem>
            <Label $isGrey>Visibility:</Label>
            <Label>{Math.round(dayData?.visibility ?? 0)} km</Label>
          </DailyDetailsGridItem>
        </DailyDetailsGrid>
        <ScrollContainer listOfScrollContainers={listOfScrollContainers}>
          {dayData?.hours?.map((hourData, index) => (
            <HourlyWeatherItem key={index} hourData={hourData} />
          ))}
        </ScrollContainer>
      </AccordionItemPanel>
    </AccordionItem>
  );
}
