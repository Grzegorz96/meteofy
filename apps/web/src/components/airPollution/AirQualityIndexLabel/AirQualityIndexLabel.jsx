import { getAqiUSData } from '../../../utils/helpers';
import { AQI_US_DATA } from '../../../utils/constants';
import {
  AirQualityIndex,
  AirQualityIndexHeader,
  FaceImg,
  Label,
  Wrapper,
  AirQualityIndexDescription,
  ErrorInfo,
  AirQualityIndexFooter,
  FaceFooter,
  FaceFooterDescription,
} from './AirQualityIndexLabel.styles';

/**
 * @component
 * Renders the label for Air Quality Index.
 *
 * @param {object} props - The props object.
 * @param {object} props.currentAirPollutionData - The current air pollution data.
 * @returns {JSX.Element} - The Air Quality Index label component.
 */
export default function AirQualityIndexLabel({ currentAirPollutionData }) {
  // Get the current AQI US data.
  const currentAqiUSData = getAqiUSData(currentAirPollutionData?.aqius);

  return (
    <AirQualityIndex>
      {currentAqiUSData ? (
        <>
          <AirQualityIndexHeader $backgroundColor={currentAqiUSData.aqiColor}>
            <FaceImg $icon={currentAqiUSData.faceIcon} />
            <Wrapper>
              <Label $fontSize="40px" $fontWeight="600">
                {currentAirPollutionData.aqius}
              </Label>
              <Label $fontSize="12px" $fontWeight="300">
                AQI US
              </Label>
            </Wrapper>
            <Label $fontSize="14px" $fontWeight="600">
              {currentAqiUSData.levelsOfConcern}
            </Label>
            <Label>
              <currentAqiUSData.thermometerIcon fontSize={40} />
            </Label>
          </AirQualityIndexHeader>
          <AirQualityIndexDescription>
            {currentAqiUSData.aqiDescription}
          </AirQualityIndexDescription>
          <AirQualityIndexFooter>
            <Wrapper>
              <FaceFooter
                $icon={AQI_US_DATA[0].faceIcon}
                $backqroundColor={AQI_US_DATA[0].aqiColor}
              />
              <FaceFooterDescription>
                {`${AQI_US_DATA[0].aqiUSLevel[0]}-${AQI_US_DATA[0].aqiUSLevel[1]}`}
                <br />
                {AQI_US_DATA[0].levelsOfConcern}
              </FaceFooterDescription>
            </Wrapper>
            <Wrapper>
              <FaceFooter
                $icon={AQI_US_DATA[1].faceIcon}
                $backqroundColor={AQI_US_DATA[1].aqiColor}
              />
              <FaceFooterDescription>
                {`${AQI_US_DATA[1].aqiUSLevel[0]}-${AQI_US_DATA[1].aqiUSLevel[1]}`}
                <br />
                {AQI_US_DATA[1].levelsOfConcern}
              </FaceFooterDescription>
            </Wrapper>
            <Wrapper>
              <FaceFooter
                $icon={AQI_US_DATA[2].faceIcon}
                $backqroundColor={AQI_US_DATA[2].aqiColor}
              />
              <FaceFooterDescription>
                {`${AQI_US_DATA[2].aqiUSLevel[0]}-${AQI_US_DATA[2].aqiUSLevel[1]}`}
                <br />
                {AQI_US_DATA[2].levelsOfConcern}
              </FaceFooterDescription>
            </Wrapper>
            <Wrapper>
              <FaceFooter
                $icon={AQI_US_DATA[3].faceIcon}
                $backqroundColor={AQI_US_DATA[3].aqiColor}
              />
              <FaceFooterDescription>
                {`${AQI_US_DATA[3].aqiUSLevel[0]}-${AQI_US_DATA[3].aqiUSLevel[1]}`}
                <br />
                {AQI_US_DATA[3].levelsOfConcern}
              </FaceFooterDescription>
            </Wrapper>
            <Wrapper>
              <FaceFooter
                $icon={AQI_US_DATA[4].faceIcon}
                $backqroundColor={AQI_US_DATA[4].aqiColor}
              />
              <FaceFooterDescription>
                {`${AQI_US_DATA[4].aqiUSLevel[0]}-${AQI_US_DATA[4].aqiUSLevel[1]}`}
                <br />
                {AQI_US_DATA[4].levelsOfConcern}
              </FaceFooterDescription>
            </Wrapper>
            <Wrapper>
              <FaceFooter
                $icon={AQI_US_DATA[5].faceIcon}
                $backqroundColor={AQI_US_DATA[5].aqiColor}
              />
              <FaceFooterDescription>
                {`${AQI_US_DATA[5].aqiUSLevel[0]}-500`}
                <br />
                {AQI_US_DATA[5].levelsOfConcern}
              </FaceFooterDescription>
            </Wrapper>
          </AirQualityIndexFooter>
        </>
      ) : (
        <ErrorInfo>No information about the Air Quality Index</ErrorInfo>
      )}
    </AirQualityIndex>
  );
}
