import React, { useState } from 'react';

export const AppContext = React.createContext(null);

export const useStore = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('auth-token'));

  // [state, actions]
  return [
    {
      selectedGenreId,
      isLoggedIn,
    },
    {
      setSelectedGenreId,
      setIsLoggedIn,
    },
  ];
};
