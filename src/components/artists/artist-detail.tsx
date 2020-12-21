import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from '../../store/actions/toastActions';
import { faHeart, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppContext } from '../../store/context';

const detailViewStyle = {
  width: '100%',
  marginLeft: '0',
  marginRight: '0',
};

const Wrapper = styled<any>('div')`
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 8px 20px 0 rgba(51, 72, 115, 0.13);
  margin-bottom: 30px;
  background-color: white;
  margin-right: 10px;
  margin-left: 10px;
  width: 280px;
  ${props => props.detailView && detailViewStyle};
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

const NoImageIcon = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 40px;
  color: ${props => props.theme.gray50};
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

const Detail = styled.div`
  padding: 12px 10px 15px 15px;
`;

const ImagePlaceholder = styled(Image)`
  display: block;
  outline: 0;
  background-color: ${props => props.theme.gray30};
  background-size: cover;
`;

const Artist = ({ id, name, image, popularity, genres, isFavorite, toast: _toast, detailView = false }) => {
  const history = useHistory();
  const [{}, { addToFavorites, removeFromFavorites }] = useContext(AppContext);

  const genre = genres ? genres.find(genre => genre.is_primary === 1) : {};
  const getAritstProps = () => {
    return { id, name, image, popularity, genres };
  };

  const onSelectGenre = genreId => {
    history.push(`/search/${genreId}`);
  };

  const confirmRemove = () => {
    const res = confirm(`Are you sure you want to remove ${name} from Favorites?`);
    if (res) removeFromFavorites(id);
    _toast({
      type: 'info',
      position: 'bottom',
      msg: `Removed ${name} from Favorites`,
      open: true,
    });
  };

  const onAddToFavorites = () => {
    addToFavorites(getAritstProps());
    _toast({
      type: 'success',
      position: 'bottom',
      msg: `Added ${name} to Favorites`,
      open: true,
    });
  };

  const imageUI = (
    <ImagePlaceholder>
      {!image && (
        <NoImageIcon>
          <FontAwesomeIcon icon={faImage} />
        </NoImageIcon>
      )}
      <Image src={image} />
    </ImagePlaceholder>
  );

  return (
    <Wrapper detailView={detailView}>
      {imageUI}
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
              if (isFavorite) confirmRemove();
              else onAddToFavorites();
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Icon>
        </div>
      </Detail>
    </Wrapper>
  );
};

export default connect(state => ({}), {
  toast,
})(Artist);
