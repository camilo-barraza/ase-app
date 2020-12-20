import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 400px;
  width: 280px;
  border-radius: 5px;
  box-shadow: 0 8px 20px 0 rgba(51, 72, 115, 0.13);
  margin-bottom: 30px;
`;

const Image = styled<any>('div')`
  height: 300px;
  width: 100%;
  margin: 0;
  padding: 0;
  background: url(${props => props.src});
  background-size: cover;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Artist = ({ id, name, image, popularity, genres }) => {
  return (
    <Wrapper>
      <Image src={image} />
      {name}
    </Wrapper>
  );
};

export default Artist;
