import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchResults from './pages/search-results';
import { AppContext } from '../app-state';
import AppNavigation from './layout/app-navigation';
import AppContainer from './layout/app-container';

const Page = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: scroll;
`;

const isLoggedIn = !!sessionStorage.getItem('auth-token');

const Routes = () => {
  // const [{ isLoggedIn }] = useContext(AppContext);
  // const { login, dashboard } = routes;

  // const ProtectedRoute = ({ path, component }) => {
  //   return (
  //     <Route path={path} component={() => (isLoggedIn ? component() : <Redirect to={{ pathname: login.path }} />)} />
  //   );
  // };

  return (
    <Router>
      {isLoggedIn && <AppNavigation />}
      <Page>
        <div className='w-100'>
          <Switch>
            <AppContainer>
              <Route component={SearchResults} path={'/search/:id'} />
              <Route exact path='/' component={() => <Redirect to={`/search/21`} />} />
            </AppContainer>
          </Switch>
        </div>
      </Page>
    </Router>
  );
};

export default Routes;
