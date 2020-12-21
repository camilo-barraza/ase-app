import React from 'react';
import { useParams } from 'react-router-dom';
import { ArtistDetails } from '../artists/artists';
import Axios from 'axios';
import { useAPI } from '../../hooks';
import AsyncContent from '../utils/async-content';

const ArtistPage = () => {
  const { id: resourceId } = useParams<any>();
  const { isLoading, data } = useAPI(
    () => Axios.get(`/api/v1/music/artists/${resourceId}`, { toApi: true }),
    resourceId,
  );

  return (
    <AsyncContent isLoading={isLoading}>
      <ArtistDetails data={data[0]} />
    </AsyncContent>
  );
};

export default ArtistPage;
