import styled from 'styled-components';

/**
 * @component
 * Styled component for the Main section of the application.
 */
export const Main = styled.main`
  padding: 20px;
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
