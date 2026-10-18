import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from 'focus-trap-react';
import {
  Overlay,
  Modal,
  ModalText,
  ModalButton,
  ModalTitle,
} from './ErrorModal.styles';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { setRootLocked } from '../../../../utils/helpers';

/**
 * @component
 * Component for rendering an error modal.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - Data object containing error information.
 * @param {function} props.setData - Function to update data.
 * @returns {JSX.Element} Returns the error modal component.
 */
export default function ErrorModal({ data, setData }) {
  const [isOpen, setIsOpen] = useState(true);

  // Portal outside #root so locking the app tree does not disable this modal.
  useEffect(() => {
    setRootLocked(true);
    return () => setRootLocked(false);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setData((prev) => ({ ...prev, error: null }));
    }
  };

  return createPortal(
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        initialFocus: '#error-modal-ok',
        fallbackFocus: '#error-modal',
        escapeDeactivates: true,
        onDeactivate: handleClose,
        allowOutsideClick: true,
        returnFocusOnDeactivate: true,
        tabbableOptions: { displayCheck: 'none' },
      }}
    >
      <Overlay onClick={handleClose}>
        <Modal
          id="error-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="error-modal-title"
          $isOpen={isOpen}
          onAnimationEnd={handleAnimationEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <FaRegCircleXmark />
          <ModalTitle id="error-modal-title">Error!</ModalTitle>
          <ModalText>{data.error}</ModalText>
          <ModalButton id="error-modal-ok" onClick={handleClose}>
            OK
          </ModalButton>
        </Modal>
      </Overlay>
    </FocusTrap>,
    document.body
  );
}
