import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  max-width: 1200px;
`;

const AppContainer = ({ children }) => {
  return (
    <div className='d-flex justify-content-center h-100 w-100'>
      <Content className='ml-4 mr-4 w-100 d-flex align-items-center'>{children}</Content>
    </div>
  );
};

export default AppContainer;
