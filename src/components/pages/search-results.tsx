import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../utils/spinner';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../layout/app-container';
import theme from '../../config/theme';
import Artists from '../artists';

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

const SearchResults = () => {
  const { id: genreId } = useParams<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState<any>([]);

  useEffect(() => {
    const loadArtists = async () => {
      setIsLoading(true);
      const res = await Axios.get(`/api/v1/music/genres/${genreId}/artists`, { toApi: true });
      setArtists(res.data);
      setIsLoading(false);
    };
    if (genreId) loadArtists();
  }, [genreId]);

  return (
    <Wrapper>
      <AppContainer backgroundColor={theme.gray10}>
        {isLoading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
        {!isLoading && <Artists artists={artists} />}
      </AppContainer>
    </Wrapper>
  );
};

export default SearchResults;
