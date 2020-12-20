import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../utils/spinner';
import { useParams, useHistory } from 'react-router-dom';

const SearchResults = () => {
  const { id: genreId } = useParams<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
    const loadArtists = async () => {
      setIsLoading(true);
      const res = await Axios.get(`/api/v1/music/genres/${genreId}/artists`, { toApi: true });
      setArtists(res.data);
      setIsLoading(false);
    };
    if (genreId) loadArtists();
  }, [genreId]);

  const loadOther = () => {
    history.push('/search/22');
  };

  return (
    <div className='mt-4 border w-100'>
      <div>
        <div onClick={loadOther}> load other </div>
        <h5>Search results:</h5>
        {isLoading && (
          <div className='d-flex align-items-center justify-content-center mt-4s'>
            <Spinner />
          </div>
        )}
        {!isLoading && <pre>{JSON.stringify(artists, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default SearchResults;
