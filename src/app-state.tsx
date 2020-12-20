import React, { useState } from 'react';
import { authTokenKey } from './config/constants';

export const AppContext = React.createContext(null);

export const useStore = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem(authTokenKey));

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
