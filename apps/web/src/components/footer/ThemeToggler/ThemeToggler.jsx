import {
  TogglerContainer,
  Toggler,
  SwitcherElement,
} from './ThemeToggler.styles';
import { useSelector, useDispatch } from 'react-redux';
import { toggleThemeMode } from '../../../state';

/**
 * @component
 * Renders a theme toggler component.
 *
 * @returns {JSX.Element} The theme toggler component.
 */
export default function ThemeToggler() {
  // Get the current theme mode from the Redux store.
  const isDarkMode = useSelector(({ themeData }) => themeData.isDarkMode);
  // Get the dispatch function from the Redux store.
  const dispatch = useDispatch();

  return (
    <TogglerContainer>
      <Toggler
        onChange={() => {
          dispatch(toggleThemeMode());
        }}
        checked={isDarkMode}
      />
      <SwitcherElement
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            dispatch(toggleThemeMode());
          }
        }}
      />
    </TogglerContainer>
  );
}
