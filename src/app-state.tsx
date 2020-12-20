import React, { useState } from 'react';

export const AppContext = React.createContext(null);
const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

export const useStore = () => {
  const [favorites, setFavorites] = useState(getFavorites());

  const addToFavorites = artist => {
    const favs = getFavorites();
    favs.push(artist);
    localStorage.setItem('favorites', JSON.stringify(favs));
    setFavorites(favs);
  };

  const removeFromFavorites = artistId => {
    let favs = getFavorites();
    favs = favs.filter(artist => artist.id !== artistId);
    localStorage.setItem('favorites', JSON.stringify(favs));
    setFavorites(favs);
  };

  const isFavorite = getFavorites().reduce((h, fav) => {
    const newH = { ...h };
    newH[fav.id] = true;
    return newH;
  }, {});

  // [state, actions]
  return [
    {
      favorites,
      isFavorite,
    },
    {
      addToFavorites,
      removeFromFavorites,
    },
  ];
};
