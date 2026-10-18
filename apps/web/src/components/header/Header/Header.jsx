import { Header, StyledLogo, StyledLink } from './Header.styles';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import SearchEngine from '../../ui/SearchEngine/SearchEngine';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCityData } from '../../../state';
import { useNavigate } from 'react-router-dom';
import { globalInputStyles } from '../../ui/SearchEngine/SearchEngine.styles';
import { useMediaQuery } from 'react-responsive';
import { ROUTES } from '../../../utils/constants';

/**
 * @component
 * Renders the header component.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function HeaderComponent() {
  // Check if the screen is mobile.
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // Get the city data from the Redux store.
  const cityData = useSelector(({ cityData }) => cityData);
  // Get the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // Get the navigate function from the React Router.
  const navigate = useNavigate();

  return (
    <Header>
      <StyledLink to={ROUTES.home}>
        <StyledLogo />
      </StyledLink>
      <SearchEngine
        placeholder={'Search for a city'}
        city={cityData}
        handleOnChange={(searchedData) => {
          dispatch(setCityData(searchedData));
          navigate(ROUTES.home);
        }}
        styles={globalInputStyles}
      />
      {isMobile ? <SideBarMenu /> : <Navbar />}
    </Header>
  );
}
