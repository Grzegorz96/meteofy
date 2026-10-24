import { Footer, StyledPageName } from './Footer.styles';
import ThemeToggler from '@/components/footer/ThemeToggler';

/**
 * @component
 * Renders the Footer component.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function FooterComponent() {
  return (
    <Footer>
      <ThemeToggler />
      <StyledPageName />
    </Footer>
  );
}
