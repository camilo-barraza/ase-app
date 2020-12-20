import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchResults from './pages/search-results';
import AppNavigation from './layout/app-navigation';
import Favorites from './pages/favorites';
import { authTokenKey } from '../config/constants';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  background-color: red;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: gray;
`;

const DEFAULT_GENRE = 21;
const isLoggedIn = !!sessionStorage.getItem(authTokenKey);

const Routes = () => {
  return (
    <Router>
      {isLoggedIn && <AppNavigation />}
      <Switch>
        <Page>
          <Content>
            <Route component={SearchResults} path={'/search/:id'} />
            <Route component={Favorites} path={'/favorites'} />
            <Route exact path='/' component={() => <Redirect to={`/search/${DEFAULT_GENRE}`} />} />
          </Content>
        </Page>
      </Switch>
    </Router>
  );
};

export default Routes;
