import { useState, useMemo } from 'react';
import {
  AccordionItem,
  AccordionItemPanel,
  AccordionItemHeading,
} from 'react-accessible-accordion';
import {
  Day,
  StyledAccordionItemButton,
  Label,
  Description,
  FaceIcon,
  SelectButtonsWrapper,
  SelectButton,
  DailyDetailsFlex,
} from '../../ui/Accordion/Accordion.styles';
import { getAqiUSData } from '../../../utils/helpers';
import ScrollContainer from '../../ui/ScrollContainer/ScrollContainer';
import AirPollutionLinearChart from '../LinearChart/LinearChart';
import { POLLUTION_NAMES } from '../../../utils/constants';
import { getAirPollutionFilteredLinearChartData } from '../../../utils/charts/chartData';
import { format } from 'date-fns';

/**
 * @component
 * Component for rendering a daily item for air pollution data. This component includes an accordion item with detailed information and a linear chart displaying hourly air pollution data.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.dayData - Data containing air pollution information for a specific day.
 * @param {Array} props.listOfScrollContainers - List of scrollable containers.
 * @returns {JSX.Element} The JSX element representing the daily air pollution item.
 */
export default function DailyAirPollutionItem({
  dayData,
  listOfScrollContainers,
  index,
}) {
  // State for the selected dataset.
  const [selectedDataset, setSelectedDataset] = useState(POLLUTION_NAMES[0]);
  // Filter the data for the selected dataset.
  const filteredData = getAirPollutionFilteredLinearChartData(
    dayData,
    selectedDataset
  );

  // Get the AQI US data.
  const aqiUSData = useMemo(
    () => getAqiUSData(dayData?.aqius),
    [dayData?.aqius]
  );

  return (
    <AccordionItem>
      <AccordionItemHeading>
        <StyledAccordionItemButton>
          <FaceIcon
            $icon={aqiUSData?.faceIcon}
            $backgroundColor={aqiUSData?.aqiColor}
          />
          <Day>
            {dayData?.datetime
              ? format(dayData.datetime, 'MM-dd EEEE')
              : 'Error'}
          </Day>
          <Description>{aqiUSData?.levelsOfConcern}</Description>
          <Label $isGrey>{`AQI US ${dayData?.aqius ?? 'Error'}`}</Label>
        </StyledAccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <DailyDetailsFlex>
          <SelectButtonsWrapper>
            {POLLUTION_NAMES.map((pollutionName) => (
              <SelectButton
                $active={selectedDataset === pollutionName}
                key={pollutionName}
                onClick={() => {
                  if (listOfScrollContainers[index]?.current) {
                    listOfScrollContainers[index].current.style.scrollBehavior =
                      'smooth';
                    listOfScrollContainers[index].current.scrollLeft = 0;
                  }

                  setSelectedDataset(pollutionName);
                }}
              >
                {pollutionName}
              </SelectButton>
            ))}
          </SelectButtonsWrapper>
          <Label $fontWeight="600">Hourly Air Pollution (μg/m³)</Label>
        </DailyDetailsFlex>
        <ScrollContainer listOfScrollContainers={listOfScrollContainers}>
          <AirPollutionLinearChart filteredData={filteredData} />
        </ScrollContainer>
      </AccordionItemPanel>
    </AccordionItem>
  );
}
