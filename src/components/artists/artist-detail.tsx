import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from '../../store/actions/toastActions';
import { faHeart, faImage, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppContext } from '../../store/context';
import theme from '../../config/theme';
import { routes } from '../../config/routes-config';

const isDetailViewStyle = {
  width: '100%',
  marginLeft: '0',
  marginRight: '0',
};

const Wrapper = styled<any>('div')`
  border-radius: 5px;
  box-shadow: 0 8px 20px 0 rgba(51, 72, 115, 0.13);
  margin-bottom: 30px;
  background-color: white;
  margin-right: 10px;
  margin-left: 10px;
  width: 280px;
  ${props => props.isDetailView && isDetailViewStyle};
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 5px;
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
  height: ${props => (props.isDetailView ? '500px' : '300px')};
  width: 100%;
  margin: 0;
  padding: 0;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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

const PopularityScore = styled.div`
  position: absolute;
  display: flex;
  top: 15px;
  right: 15px;
  font-size: 16px;
  padding: 5px 10px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 8px 16px rgba(8, 35, 48, 0.2);
  font-weight: 700;
  color: ${props => props.theme.gray55};
  .icon {
    color: ${props => props.theme.orange30};
  }
  opacity: 0.9;
`;

const primaryGenreStyle = {
  backgroundColor: theme.blue20,
  color: 'white',
  border: `2px solid ${theme.blue20}`,
};

const GenreWrapper = styled<any>('div')`
  display: inline-block;
  padding: 2px 10px;
  display: flex;
  align-items: flex-start;
  border-radius: 12px;
  font-weight: 700;
  font-size: 12px;
  max-width: 200px;
  margin-right: 11px;
  color: ${props => props.theme.blue20};
  border: 2px solid ${props => props.theme.blue20};
  ${props => props.isPrimary && primaryGenreStyle};
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Details = styled<any>('div')`
  padding: ${props => (props.isDetailView ? '16px 10px 15px 20px' : '12px 10px 15px 15px')};
`;

const ViewDetailText = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 8px 16px rgba(8, 35, 48, 0.2);
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.gray55};
  .icon {
    color: ${props => props.theme.orange30};
  }
  opacity: 0.9;
`;

const ViewDetailsHoverArea = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  opacity: 0;
`;

const ImagePlaceholder = styled(Image)`
  display: block;
  outline: 0;
  position: relative;
  background-color: ${props => props.theme.gray30};
  background-size: cover;
  ${props =>
    !props.isDetailView &&
    `
  :hover {
    cursor: pointer;
    .image {
      opacity: 0.3;
    }
    .details {
      opacity: 1 !important;
    }
  }
  `};
`;

const Genre = ({ id, name, isPrimary = false }) => {
  const history = useHistory();
  const onSelectGenre = genreId => {
    history.push(routes.search(genreId));
  };

  return (
    <div>
      <GenreWrapper
        isPrimary={isPrimary}
        onClick={() => {
          onSelectGenre(id);
        }}
        className='flex-start d-flex'
      >
        <GenreText>{name}</GenreText>
      </GenreWrapper>
    </div>
  );
};

const Artist = ({ id, name, image, popularity, genres, toast: _toast, isDetailView = false }) => {
  const [{ isFavoriteHash }, { addToFavorites, removeFromFavorites }] = useContext(AppContext);

  const isFavorite = isFavoriteHash[id] || false;
  const history = useHistory();
  const sortedGenres = genres.sort((a, b) => b.is_primary - a.is_primary);
  const getAritstProps = () => {
    return { id, name, image, popularity, genres };
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

  const gotoArtist = () => {
    history.push(routes.artistDetail(id));
  };

  const popularityScoreUI = (
    <PopularityScore>
      <div className='icon mr-2'>
        <FontAwesomeIcon icon={faStar} />
      </div>
      Popularity score: {popularity}
    </PopularityScore>
  );

  const viewDetailsUI = (
    <ViewDetailsHoverArea onClick={gotoArtist} className='details'>
      <ViewDetailText> View Details </ViewDetailText>
    </ViewDetailsHoverArea>
  );

  const hasImage = image !== '';
  const imageUI = (
    <ImagePlaceholder isDetailView={isDetailView}>
      {hasImage && <Image isDetailView={isDetailView} className='image' src={image} />}
      {isDetailView ? popularityScoreUI : viewDetailsUI}
      {!hasImage && (
        <NoImageIcon>
          <FontAwesomeIcon icon={faImage} />
        </NoImageIcon>
      )}
    </ImagePlaceholder>
  );

  const primaryGenreUI = (
    <div className='d-flex'>
      <Genre {...sortedGenres[0]} isPrimary={true} />
    </div>
  );

  const additionalGenreUI = (
    <>
      {sortedGenres.slice(1).map((genre, index) => (
        <div key={index} className='d-flex'>
          <Genre {...genre} />
        </div>
      ))}
    </>
  );

  const favoriteIconUI = (
    <div className='d-flex align-items-end'>
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
  );

  return (
    <Wrapper isDetailView={isDetailView}>
      {imageUI}
      <Details isDetailView={isDetailView}>
        <Name>{name}</Name>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            {primaryGenreUI}
            {isDetailView && additionalGenreUI}
          </div>
          {favoriteIconUI}
        </div>
      </Details>
    </Wrapper>
  );
};

export default connect(state => ({}), {
  toast,
})(Artist);
