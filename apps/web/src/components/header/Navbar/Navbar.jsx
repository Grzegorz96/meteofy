import { NavLink } from 'react-router-dom';
import { Navigate } from './Navbar.styles';
import { navLinkStyles } from './navbar.helpers';
import { GiPoland } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faEarthEurope,
  faCalendarDays,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../../utils/constants';

/**
 * @component
 * Renders the navigation component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isMobile - Indicates if the device is mobile.
 * @param {function} [props.onClose] - Closes the mobile side bar after a nav link is clicked.
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export default function Navbar({ isMobile, onClose }) {
  return (
    <Navigate $isMobile={isMobile} onClick={isMobile ? onClose : undefined}>
      <NavLink to={ROUTES.poland} style={navLinkStyles}>
        <GiPoland />
        Poland
      </NavLink>
      <NavLink to={ROUTES.europe} style={navLinkStyles}>
        <FontAwesomeIcon icon={faEarthEurope} />
        Europe
      </NavLink>
      <NavLink to={ROUTES.world} style={navLinkStyles}>
        <FontAwesomeIcon icon={faGlobe} />
        World
      </NavLink>
      <NavLink to={ROUTES.longTermWeather} style={navLinkStyles}>
        <FontAwesomeIcon icon={faCalendarDays} />
        Long term weather
      </NavLink>
      <NavLink to={ROUTES.airPollution} style={navLinkStyles}>
        <FontAwesomeIcon icon={faListCheck} />
        Air pollution
      </NavLink>
    </Navigate>
  );
}
