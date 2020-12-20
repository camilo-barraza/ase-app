import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logoPng from '../../assets/logo.png';
import SearchInput from '../utils/search-input';
import AppContainer from './app-container';
import { useHistory } from 'react-router-dom';

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
        <div className='d-flex d-flex align-items-center'>
          {logo}
          {logoText}
          <SearchBox />
        </div>
      </AppContainer>
    </Wrapper>
  );
};

export default AppNavigation;
