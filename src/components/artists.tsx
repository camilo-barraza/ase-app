import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from '../app-state';

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

const Name = styled.div`
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 4px;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  color: ${props => props.theme.gray55};
`;

const GenreText = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

const Genre = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.blue20};
  padding: 2px 10px;
  display: flex;
  align-items: flex-start;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 12px;
  max-width: 200px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Icon = styled<any>('div')`
  font-size: 25px;
  color: ${props => (props.isFavorite ? props.theme.pink30 : props.theme.gray40)};
  height: 43px;
  width: 43px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  :hover {
    background-color: ${props => props.theme.gray20};
    cursor: pointer;
  }
`;

const Detail = styled.div`
  padding: 12px 10px 15px 15px;
`;

const ArtistsWrapper = styled.div`
  margin-top: 35px;
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Artists = ({ artists }) => {
  const [{ isFavorite }, {}] = useContext(AppContext);
  return (
    <ArtistsWrapper className='w-100'>
      {artists.map((artist, index) => (
        <div key={index}>
          <Artist {...artist} isFavorite={isFavorite[artist.id] || false} />
        </div>
      ))}
    </ArtistsWrapper>
  );
};

const Artist = ({ id, name, image, popularity, genres, isFavorite }) => {
  const history = useHistory();
  const [{}, { addToFavorites, removeFromFavorites }] = useContext(AppContext);

  const genre = genres.find(genre => genre.is_primary === 1);
  const getAritstProps = () => {
    return { id, name, image, popularity, genres };
  };

  const onSelectGenre = genreId => {
    history.push(`/search/${genreId}`);
  };

  return (
    <Wrapper>
      <Image src={image} />
      <Detail>
        <Name>{name}</Name>
        <div className='d-flex justify-content-between'>
          <div>
            {genre && (
              <Genre
                onClick={() => {
                  onSelectGenre(genre.id);
                }}
                className='flex-start d-flex'
              >
                <GenreText>{genre.name}</GenreText>
              </Genre>
            )}
          </div>
          <Icon
            isFavorite={isFavorite}
            onClick={() => {
              if (isFavorite) removeFromFavorites(id);
              else addToFavorites(getAritstProps());
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Icon>
        </div>
      </Detail>
    </Wrapper>
  );
};

export default Artists;
