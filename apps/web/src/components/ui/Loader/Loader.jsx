import { ClipLoader } from 'react-spinners';
import { LoaderWrapper, LoaderText } from './Loader.styles';
import { useTheme } from 'styled-components';

/**
 * @component
 * Loader component to display a loading spinner with optional text.
 *
 * @returns {JSX.Element} Loader component.
 */
export default function Loader() {
  const { textPrimary } = useTheme();

  return (
    <LoaderWrapper>
      <ClipLoader loading={true} color={textPrimary} size={100} />
      <LoaderText color={textPrimary}>Loading...</LoaderText>
    </LoaderWrapper>
  );
}
