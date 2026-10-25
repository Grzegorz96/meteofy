import styled from 'styled-components';

/**
 * @component
 * Container for the WebGL canvas.
 */
export const CanvasContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #01040c;
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  transition: opacity 0.4s ease;

  canvas {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;
