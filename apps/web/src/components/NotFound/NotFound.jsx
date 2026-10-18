import { NotFoundWrapper, LinkStyled, Title } from './NotFound.styles';
import { useEffect, useRef } from 'react';
import { ROUTES } from '../../utils/constants';

/**
 * @component
 * Renders the NotFound component.
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
export default function NotFound() {
  // Create a reference for the link element.
  const linkRef = useRef(null);
  // Focus on the link element when the component mounts.
  useEffect(() => {
    linkRef?.current?.focus();
  }, []);

  return (
    <NotFoundWrapper>
      <Title>404 - Not Found!</Title>
      <LinkStyled to={ROUTES.home} ref={linkRef}>
        Go to Home
      </LinkStyled>
    </NotFoundWrapper>
  );
}
