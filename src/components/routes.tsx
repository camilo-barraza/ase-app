import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchResults from './pages/search-results';
import { AppContext } from '../app-state';
import AppNavigation from './layout/app-navigation';
import AppContainer from './layout/app-container';
import Favorites from './pages/favorites';

const Page = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: scroll;
`;

const DEFAULT_GENRE = 21;
const isLoggedIn = !!sessionStorage.getItem('auth-token');

const Routes = () => {
  return (
    <Router>
      {isLoggedIn && <AppNavigation />}
      <Page>
        <div className='w-100'>
          <Switch>
            <AppContainer>
              <Route component={SearchResults} path={'/search/:id'} />
              <Route component={Favorites} path={'/favorites'} />
              <Route exact path='/' component={() => <Redirect to={`/search/${DEFAULT_GENRE}`} />} />
            </AppContainer>
          </Switch>
        </div>
      </Page>
    </Router>
  );
};

export default Routes;
