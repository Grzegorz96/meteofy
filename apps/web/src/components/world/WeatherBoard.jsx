import { Text, Decal, useTexture, Box, useCursor } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRef, useLayoutEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { openWeatherModal } from '../ui/modals/WeatherModal/WeatherModal';

/**
 * @component
 * WeatherBoard component displays weather information for a specific location.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.position - The position of the weather board.
 * @param {Object} props.capital - The capital object containing weather data.
 * @param {Function} props.isFrontmostBoard - Checks if this board is under the pointer.
 * @param {Function} [props.onReady] - Called once both Text labels on this board have synced.
 * @returns {JSX.Element} The WeatherBoard component.
 */
export default function WeatherBoard({
  position,
  capital,
  isFrontmostBoard,
  onReady,
}) {
  const theme = useTheme();
  const { gl } = useThree();
  // Hover drives both tile highlight and pointer cursor.
  const [isHovered, setIsHovered] = useState(false);

  useCursor(isHovered, 'pointer', '', gl.domElement);

  // Load texture for weather icon.
  const texture = useTexture(
    `/assets/openMeteoIcons/${capital?.main?.icon ?? 'unknown'}.png`
  );

  // Reference for the weather board object.
  const weatherBoardRef = useRef();

  // Tracks which texts on this board finished syncing (troika is async).
  const syncedParts = useRef(new Set());

  // Ensure the weather board always faces the camera.
  useLayoutEffect(() => {
    weatherBoardRef.current.lookAt(0, 0, 0);
  }, []);

  // Report board readiness once both temp and city texts have synced.
  function reportSynced(part) {
    if (syncedParts.current.has(part)) return;
    syncedParts.current.add(part);
    if (syncedParts.current.size === 2) onReady?.();
  }

  // Open the weather modal only for the frontmost board.
  function handleBoardClick(evt) {
    evt.stopPropagation();
    if (!isFrontmostBoard(weatherBoardRef)) return;
    openWeatherModal(capital, theme);
  }

  // Highlight only for mouse on the frontmost board, and not while dragging.
  function handleBoardHover(evt) {
    evt.stopPropagation();
    if (evt.pointerType !== 'mouse') return;
    if (gl.domElement.matches(':active')) return;
    if (!isFrontmostBoard(weatherBoardRef)) return;
    setIsHovered(true);
  }

  // Clear hover when the pointer leaves the board.
  function handleBoardHoverOut(evt) {
    evt.stopPropagation();
    setIsHovered(false);
  }

  return (
    <Box
      ref={weatherBoardRef}
      onClick={handleBoardClick}
      onPointerOver={handleBoardHover}
      onPointerOut={handleBoardHoverOut}
      args={[0.12, 0.08, 0.005]}
      position={position}
      name={`weather-board-${capital?.name}`}
    >
      <meshStandardMaterial
        color={isHovered ? '#1dbb25' : '#81832c'}
        transparent
        opacity={0.6}
      />
      <Decal
        layers={1}
        name="decal"
        rotation={[0, Math.PI, 0]}
        position={[-0.025, 0.01, 0]}
        scale={[0.07, 0.06, 0.01]}
        renderOrder={1}
        depthTest={true}
        depthWrite={true}
      >
        <meshBasicMaterial
          transparent
          polygonOffset={true}
          polygonOffsetFactor={-1}
          map={texture}
        />
      </Decal>
      <Text
        onSync={() => reportSynced('temp')}
        layers={1}
        name="temp-text"
        color={'#f6f3ea'}
        fontSize={0.025}
        maxWidth={1}
        lineHeight={0.02}
        position={[0.03, 0.008, -0.003]}
        rotation={[0, Math.PI, 0]}
      >
        {Math.round(capital?.main?.temp ?? 0)}°
      </Text>
      <Text
        onSync={() => reportSynced('city')}
        layers={1}
        name="city-text"
        color={'#f6f3ea'}
        fontSize={0.018}
        maxWidth={1}
        lineHeight={0.02}
        position={[0, -0.025, -0.003]}
        rotation={[0, Math.PI, 0]}
      >
        {capital?.name ?? 'Error'}
      </Text>
    </Box>
  );
}
