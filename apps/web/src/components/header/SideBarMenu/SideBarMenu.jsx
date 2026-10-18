import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { StyledBurgerMenu } from './SideBarMenu.styles';
import Navbar from '../Navbar/Navbar';
import { FocusTrap } from 'focus-trap-react';

export default function SideBarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const burgerButton = document.getElementById('react-burger-menu-btn');
    if (!burgerButton) return;

    if (isOpen) {
      burgerButton.setAttribute('tabindex', '-1');
    } else {
      burgerButton.removeAttribute('tabindex');
    }
  }, [isOpen]);

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        allowOutsideClick: true,
        escapeDeactivates: false,
        returnFocusOnDeactivate: true,
        fallbackFocus: '.bm-menu-wrap',
        tabbableOptions: { displayCheck: 'none' },
      }}
    >
      <StyledBurgerMenu>
        <Menu right isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
          <Navbar isMobile onClose={handleClose} />
        </Menu>
      </StyledBurgerMenu>
    </FocusTrap>
  );
}
