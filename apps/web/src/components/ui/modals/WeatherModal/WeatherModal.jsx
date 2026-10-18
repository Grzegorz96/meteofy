import {
  Paragraph,
  WeatherIcon,
  WeatherInfo,
  WeatherInfoValue,
  Title,
} from './WeatherModal.styles';
import '../../../../assets/CSS/sweetAlert2Styles/weatherCityModal.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setRootInert } from '../../../../utils/helpers';

/**
 * Opens a modal displaying weather information for a city.
 *
 * @param {Object} city - The city object containing weather data.
 * @param {Object} theme - The theme object for styling.
 */
export const openWeatherModal = (city, theme) => {
  // Create a SweetAlert instance with React support.
  const MySwal = withReactContent(Swal);

  // Open the SweetAlert modal with customized options.
  MySwal.fire({
    width: '400px',
    background: theme.secondary,
    heightAuto: false,
    returnFocus: false,
    focusConfirm: true,
    iconHtml: <WeatherIcon $icon={city?.main?.icon} />,
    title: (
      <>
        <Title $theme={theme}>
          {`${city?.name ?? 'Error'} ${Math.round(city?.main?.temp ?? 0)}°C`}
        </Title>
        <Paragraph $theme={theme}>{city?.main?.description}</Paragraph>
      </>
    ),
    html: (
      <>
        <WeatherInfo $theme={theme}>
          feels like:
          <WeatherInfoValue $theme={theme}>
            {`${Math.round(city?.main?.feelsLike ?? 0)}°C`}
          </WeatherInfoValue>
        </WeatherInfo>
        <WeatherInfo $theme={theme}>
          humidity:
          <WeatherInfoValue $theme={theme}>
            {`${Math.round(city?.main?.humidity ?? 0)}%`}
          </WeatherInfoValue>
        </WeatherInfo>
        <WeatherInfo $theme={theme}>
          wind:
          <WeatherInfoValue $theme={theme}>
            {`${Math.round(city?.main?.windSpeed ?? 0)} km/h`}
          </WeatherInfoValue>
        </WeatherInfo>
        <WeatherInfo $theme={theme}>
          pressure:
          <WeatherInfoValue $theme={theme}>
            {`${Math.round(city?.main?.pressure ?? 0)} hPa`}
          </WeatherInfoValue>
        </WeatherInfo>
        <WeatherInfo $theme={theme}>
          clouds:
          <WeatherInfoValue $theme={theme}>
            {`${Math.round(city?.main?.cloudCover ?? 0)}%`}
          </WeatherInfoValue>
        </WeatherInfo>
      </>
    ),
    // SweetAlert sets aria-hidden on #root; we only add inert (+ blur via helper).
    willOpen: () => setRootInert(true),
    didClose: () => setRootInert(false),
    didOpen: () => {
      // Customize the confirm button style after the modal is opened.
      const confirmButton = Swal.getConfirmButton();
      if (confirmButton) confirmButton.style.color = theme.textPrimary;
    },
    customClass: {
      // Define custom CSS classes for different modal elements.
      title: 'modal-title',
      htmlContainer: 'modal-html-container',
      icon: 'modal-icon',
      popup: 'modal-popup',
    },
  });
};

/**
 * Closes the weather modal.
 */
export const closeWeatherModal = () => {
  // Create a SweetAlert instance with React support.
  const MySwal = withReactContent(Swal);

  // Close the SweetAlert modal.
  MySwal.close();
};
