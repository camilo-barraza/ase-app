import Axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useAPI } from '../../hooks';
import { AppContext } from '../../store/context';
import AsyncContent from '../utils/async-content';
import Artist from './artist-detail';

const ArtistsWrapper = styled.div`
  margin-top: 35px;
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Header = styled.div`
  font-size: 23px;
  font-weight: 600;
`;

const ArtistDetailsWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`;

export const ArtistDetails = ({ data }) => {
  const [{ isFavorite }, {}] = useContext(AppContext);
  const { id } = data;
  const { isLoading, data: artists } = useAPI(
    () => Axios.get(`/api/v1/music/artists/${id}/similar`, { toApi: true }),
    id,
  );

  return (
    <ArtistDetailsWrapper>
      <div className='mt-4'>{data && <Artist {...data} detailView={true} isFavorite={isFavorite[id] || false} />}</div>
      <Header> Related Artists: </Header>
      <AsyncContent isLoading={isLoading}>
        <Artists data={artists} />
      </AsyncContent>
    </ArtistDetailsWrapper>
  );
};

const Artists = ({ data }) => {
  const [{ isFavorite }, {}] = useContext(AppContext);
  return (
    <ArtistsWrapper className='w-100'>
      {data.map((artist, index) => (
        <div key={index}>
          <Artist {...artist} isFavorite={isFavorite[artist.id] || false} />
        </div>
      ))}
    </ArtistsWrapper>
  );
};

export default Artists;
