import Axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Artists from '../artists/artists';
import { useAPI } from '../../hooks';
import AsyncContent from '../utils/async-content';

const SearchResultsPage = () => {
  const { id: resourceId } = useParams<any>();
  const { isLoading, data } = useAPI(
    () => Axios.get(`/api/v1/music/genres/${resourceId}/artists`, { toApi: true }),
    resourceId,
  );
  return (
    <AsyncContent isLoading={isLoading}>
      <Artists data={data} />
    </AsyncContent>
  );
};

export default SearchResultsPage;
