import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import AppContainer from '../layout/app-container';
import Spinner from './spinner';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${props => props.theme.gray10};
`;

const SpinnerWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 150px;
`;

const AsyncContent = ({ isLoading, children, backgroundColor = theme.gray10 }) => {
  return (
    <Wrapper>
      <AppContainer backgroundColor={backgroundColor}>
        {isLoading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
        {!isLoading && children}
      </AppContainer>
    </Wrapper>
  );
};

export default AsyncContent;
