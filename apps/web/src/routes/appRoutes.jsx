import {
  HomePage,
  PolandPage,
  EuropePage,
  WorldPage,
  NotFoundPage,
  AirPollutionPage,
  LongTermWeatherPage,
} from '../pages';
import { ROUTES, PAGE_TITLES, toLayoutPath } from '../utils/constants';

/**
 * Child routes rendered inside the layout at `/`.
 * Home is the index route. The other paths are relative to that layout.
 *
 * @type {Array<{ index?: boolean, path?: string, element: JSX.Element, handle: { title: string } }>}
 */
export const appRoutes = [
  {
    index: true,
    element: <HomePage />,
    handle: { title: PAGE_TITLES.home },
  },
  {
    path: toLayoutPath(ROUTES.poland),
    element: <PolandPage />,
    handle: { title: PAGE_TITLES.poland },
  },
  {
    path: toLayoutPath(ROUTES.europe),
    element: <EuropePage />,
    handle: { title: PAGE_TITLES.europe },
  },
  {
    path: toLayoutPath(ROUTES.world),
    element: <WorldPage />,
    handle: { title: PAGE_TITLES.world },
  },
  {
    path: toLayoutPath(ROUTES.longTermWeather),
    element: <LongTermWeatherPage />,
    handle: { title: PAGE_TITLES.longTermWeather },
  },
  {
    path: toLayoutPath(ROUTES.airPollution),
    element: <AirPollutionPage />,
    handle: { title: PAGE_TITLES.airPollution },
  },
  {
    path: toLayoutPath(ROUTES.notFound),
    element: <NotFoundPage />,
    handle: { title: PAGE_TITLES.notFound },
  },
];
