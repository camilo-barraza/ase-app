import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logoPng from '../../assets/logo.png';
import SearchInput from '../utils/search-input';
import AppContainer from './app-container';
import { useHistory } from 'react-router-dom';
import DropdownMenu from '../utils/dropdown-menu';
import { Icon } from '../utils/buttons';
import userSVG from '../../assets/user.svg';
import { authTokenKey } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  min-height: 65px;
  box-shadow: 0 8px 20px 0 rgba(51, 72, 115, 0.13);
  flex: 0 1;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const Text1 = styled(Text)`
  color: ${props => props.theme.blue20};
`;

const Text2 = styled(Text)`
  color: ${props => props.theme.blue50};
`;

const SearchBoxWrapper = styled.div`
  width: 350px;
  margin-left: 50px;
`;

const Logo = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const FavoritesButton = styled.div`
  color: ${props => props.theme.blue20};
  font-weight: 700;
  height: 40px;
  font-size: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

enum USER_MENU_ACTIONS {
  FAVORITES = 'FAVORITES',
  LOGOUT = 'LOGOUT',
}

const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faHeart} />,
    label: 'My Favorites',
    value: USER_MENU_ACTIONS.FAVORITES,
  },
  {
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    label: 'Logout',
    value: USER_MENU_ACTIONS.LOGOUT,
  },
];

const SearchBox = () => {
  const [value, setValue] = useState('');
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loadGenres = async () => {
      setIsLoading(true);
      const { data } = await Axios.get(`/api/v1/music/genres`, {
        params: { limit: 30, q: value },
        toApi: true,
      });
      setMenu(
        data.map(el => {
          return { label: el.name, value: el.id };
        }),
      );
      setIsLoading(false);
    };
    loadGenres();
  }, [value]);

  const onSelectGenre = genreId => {
    history.push(`/search/${genreId}`);
  };

  const onChange = value => {
    setValue(value);
  };

  return (
    <SearchBoxWrapper className='d-flex'>
      <SearchInput
        isLoading={isLoading}
        placeholder='Enter a genre to find artists'
        menu={menu}
        onSelect={onSelectGenre}
        onChange={onChange}
      />
    </SearchBoxWrapper>
  );
};

const AppNavigation = () => {
  const history = useHistory();

  const onSelectUserMenuOption = item => {
    const { FAVORITES, LOGOUT } = USER_MENU_ACTIONS;
    switch (item) {
      case FAVORITES:
        history.push('/favorites');
        break;
      case LOGOUT:
        sessionStorage.setItem(authTokenKey, null);
        window.location.assign('/login');
        break;
    }
  };

  const logo = (
    <Logo>
      <img height='40px' src={logoPng} />
    </Logo>
  );

  const logoText = (
    <div className='d-flex ml-1'>
      <Text1>ASE</Text1>
      <Text2>App</Text2>
    </div>
  );

  return (
    <Wrapper>
      <AppContainer>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <div className='d-flex d-flex align-items-center'>
            <LogoArea onClick={() => window.location.assign('/')}>
              {logo}
              {logoText}
            </LogoArea>
            <SearchBox />
          </div>
          <div>
            <DropdownMenu
              icon={
                <Icon>
                  <img src={userSVG} draggable={false} />
                </Icon>
              }
              menu={userMenu}
              onSelectItem={onSelectUserMenuOption}
            />
          </div>
        </div>
      </AppContainer>
    </Wrapper>
  );
};

export default AppNavigation;
