import styled from 'styled-components';

/**
 * @component
 * Wrapper for the loader component.
 */
export const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

/**
 * @component
 * Text for the loader component.
 *
 * @prop {string} color - The color of the text.
 */
export const LoaderText = styled.span`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: ${({ color }) => color};
  transition: color 0.25s ease-in-out;
`;
