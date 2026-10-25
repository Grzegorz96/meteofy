import styled, { css, keyframes } from 'styled-components';

const slideInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -200%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const slideOutToTop = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -200%);
  }
`;

/**
 * @component
 * Overlay component to create a backdrop for modals.
 */
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.overlay};
  z-index: 9999;
`;

/**
 * @component
 * Modal component styled with animation.
 */
export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textPrimary};
  box-shadow: 0 0 10px ${({ theme }) => theme.shadow};
  transition:
    color 0.25s ease-in-out,
    background-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  border-radius: 5px;
  max-width: 550px;
  width: 90%;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideInFromTop} 0.7s ease-out forwards
        `
      : css`
          ${slideOutToTop} 0.7s ease-out forwards
        `};

  svg {
    font-size: 90px;
    color: #f27474;

    @media (max-width: 768px) {
      font-size: 70px;
    }
  }
`;

/**
 * @component
 * ModalTitle component for modal titles.
 */
export const ModalTitle = styled.h1`
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

/**
 * @component
 * ModalText component for modal text content.
 */
export const ModalText = styled.span`
  font-size: 20px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/**
 * @component
 * ModalButton component for modal buttons.
 */
export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #7066e0;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.25s ease-in-out;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;

  &:focus {
    outline: 3px solid #7066e099;
  }

  &:hover {
    background-color: #655cc9;
  }
`;
