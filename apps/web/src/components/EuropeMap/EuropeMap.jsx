import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { WeatherIcon, Temp } from './EuropeMap.styles';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import '../../assets/CSS/reactLeafletStyles/customMarkerIcon.css';
import '../../assets/CSS/reactLeafletStyles/customControlZoom.css';
import {
  openWeatherModal,
  closeWeatherModal,
} from '../ui/modals/WeatherModal/WeatherModal';
import { useTheme } from 'styled-components';

/**
 * @component
 * Component for rendering a map of Europe with weather information for cities.
 *
 * @param {Object} props - The component props.
 * @param {Object[]} props.fetchedCitiesData - An array of city data fetched from an API.
 * @returns {JSX.Element} The rendered component.
 */
export default function EuropeMap({ fetchedCitiesData }) {
  // Get the current theme from styled-components.
  const theme = useTheme();

  // Update the map container styles when the theme changes and close the weather modal when the component unmounts or theme changes.
  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');

    mapContainer.style.setProperty(
      '--elements-background-color',
      theme.europeMarker
    );

    mapContainer.style.setProperty(
      '--elements-hover-background-color',
      theme.backgroundFocus
    );

    mapContainer.style.setProperty('--elements-color', theme.textPrimary);

    return () => {
      closeWeatherModal();
    };
  }, [theme]);

  // Custom marker icon for displaying weather information.
  const customMarker = (weatherIcon, temperature) => {
    return divIcon({
      className: 'marker-icon',
      iconSize: [60, 40],
      iconAnchor: [30, 60],
      html: renderToString(
        <>
          <Temp>{Math.round(temperature)}°</Temp>
          <WeatherIcon $icon={weatherIcon} />
        </>
      ),
    });
  };

  return (
    <MapContainer
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        overflow: 'hidden',
      }}
      minZoom={4}
      maxZoom={13}
      dragging={true}
      center={[50, 15]}
      zoom={4}
      maxBounds={[
        [35, -25],
        [70, 45],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; Esri &mdash; Source: Esri"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`}
      />
      <MarkerClusterGroup chunkedLoading={true} showCoverageOnHover={false}>
        {/* Map over each city to render individual markers */}
        {fetchedCitiesData?.map((city, index) => (
          <Marker
            eventHandlers={{
              click: () => openWeatherModal(city, theme),
              keydown: (e) => {
                if (e.originalEvent.key === 'Enter') {
                  e.originalEvent.preventDefault();
                  openWeatherModal(city, theme);
                }
              },
            }}
            key={city?.name ?? index}
            position={[city?.coord?.lat ?? 0, city?.coord?.lon ?? 0]}
            icon={customMarker(city?.main?.icon, city?.main?.temp ?? 0)}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
