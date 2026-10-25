import { Wrapper, Spinner } from './Loader.styles';

/**
 * Compact loader shown in the city search dropdown while options are fetched.
 *
 * @returns {JSX.Element}
 */
export default function Loader() {
  return (
    <Wrapper>
      <Spinner />
      <span>Searching…</span>
    </Wrapper>
  );
}
