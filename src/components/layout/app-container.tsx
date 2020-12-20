import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  max-width: 1200px;
`;

const Wrapper = styled<any>('div')`
  background-color: ${props => props.backgroundColor};
`;

const AppContainer = ({ children, backgroundColor = 'white' }) => {
  return (
    <Wrapper backgroundColor={backgroundColor} className='d-flex justify-content-center w-100'>
      <Content className='ml-4 mr-4 w-100 d-flex align-items-center'>{children}</Content>
    </Wrapper>
  );
};

export default AppContainer;
