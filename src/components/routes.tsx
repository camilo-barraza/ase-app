import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppNavigation from './layout/app-navigation';
import { authTokenKey } from '../config/constants';
import SearchResultsPage from './pages/search-results-page';
import FavoritesPage from './pages/favorites-page';
import ArtistPage from './pages/artist-page';

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
            <Route component={SearchResultsPage} path={'/search/:id'} />
            <Route component={FavoritesPage} path={'/favorites'} />
            <Route component={ArtistPage} path={'/artist/:id'} />
            <Route exact path='/' component={() => <Redirect to={`/search/${DEFAULT_GENRE}`} />} />
          </Content>
        </Page>
      </Switch>
    </Router>
  );
};

export default Routes;
