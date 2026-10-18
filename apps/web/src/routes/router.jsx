import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { ROUTES } from '../utils/constants';
import { appRoutes } from './appRoutes';

/**
 * Router configuration for the application.
 *
 * @returns {Object} The created router object.
 */
export const router = createBrowserRouter(
  [
    {
      path: ROUTES.home,
      element: <MainLayout />,
      children: appRoutes,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
