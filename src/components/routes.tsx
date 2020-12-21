import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppNavigation from './layout/app-navigation';
import { authTokenKey } from '../config/constants';
import SearchResultsPage from './pages/search-results-page';
import FavoritesPage from './pages/favorites-page';
import ArtistPage from './pages/artist-page';
import { routes } from '../config/routes-config';
import SignIn from './pages/sign-in';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  background-color: white;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const authToken = sessionStorage.getItem(authTokenKey);
const isLoggedIn = authToken && authToken !== null;
if (window.location.pathname !== routes.signIn && !isLoggedIn) window.location.assign(routes.signIn);

const Routes = () => {
  return (
    <Router>
      {isLoggedIn && <AppNavigation />}
      <Switch>
        <Page>
          <Content>
            {isLoggedIn && (
              <>
                <Route exact component={SearchResultsPage} path={routes.search()} />
                <Route exact component={FavoritesPage} path={routes.favorites} />
                <Route exact component={ArtistPage} path={routes.artistDetail()} />
                <Redirect to={routes.default} />
              </>
            )}
            <Route exact component={SignIn} path={routes.signIn} />
            <Route exact path='/' component={() => <Redirect to={isLoggedIn ? routes.default : routes.signIn} />} />
          </Content>
        </Page>
      </Switch>
    </Router>
  );
};

export default Routes;
