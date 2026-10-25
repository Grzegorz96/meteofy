import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './utils/styles/globalStyles.js';
import { darkTheme, lightTheme } from './utils/styles/theme.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

/**
 * The main component of the application.
 * Renders the app with the current theme mode and provides the router.
 *
 * @returns {JSX.Element} The rendered app component.
 */
export default function App() {
  // Get the current theme mode from the Redux store
  const isDarkMode = useSelector(({ themeData }) => themeData.isDarkMode);

  useEffect(() => {
    document.documentElement.style.removeProperty('background-color');
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles /> {/* Apply global styles */}
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ThemeProvider>
  );
}
