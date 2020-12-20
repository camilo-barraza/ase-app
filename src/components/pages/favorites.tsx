import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../app-state';
import theme from '../../config/theme';
import Artists from '../artists';
import AppContainer from '../layout/app-container';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.gray10};
`;

const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 100px;
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.gray50};
`;

const Favorites = () => {
  const [{ favorites }, {}] = useContext(AppContext);
  const isEmpty = favorites.length === 0;

  return (
    <Wrapper>
      <AppContainer backgroundColor={theme.gray10}>
        {!isEmpty && <Artists artists={favorites} />}
        {isEmpty && <EmptyList> No Artists in List </EmptyList>}
      </AppContainer>
    </Wrapper>
  );
};

export default Favorites;
