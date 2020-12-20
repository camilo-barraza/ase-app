import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Routes from './components/routes';
import './config/axios';
import './App.css';
import theme from './config/theme';
import { AppContext, useStore } from './app-state';

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
  flex-flow: column;
`;

function App(): JSX.Element {
  const store = useStore();

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppContext.Provider value={store}>
          <AppWrapper>
            <Routes />
          </AppWrapper>
        </AppContext.Provider>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
