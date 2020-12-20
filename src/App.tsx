import React from 'react';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Routes from './components/routes';
import './config/axios';
import './App.css';
import theme from './config/theme';
import { AppContext, useStore } from './store/context';
import { reduxStore } from './store/redux';
import Toast from './components/utils/toast';

const AppContainer = styled.div`
  font-family: 'Libre Franklin', sans-serif;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
`;

const AppWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

function App(): JSX.Element {
  const store = useStore();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={reduxStore}>
        <AppContext.Provider value={store}>
          <AppContainer>
            <AppWrapper>
              <Toast />
              <Routes />
            </AppWrapper>
          </AppContainer>
        </AppContext.Provider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
