import React, { useState } from 'react';

export const AppContext = React.createContext(null);

export const useStore = () => {
  const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];
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

  const isFavoriteHash = getFavorites().reduce((h, fav) => {
    const newH = { ...h };
    newH[fav.id] = true;
    return newH;
  }, {});

  // [state, actions]
  return [
    {
      favorites,
      isFavoriteHash,
    },
    {
      addToFavorites,
      removeFromFavorites,
    },
  ];
};
