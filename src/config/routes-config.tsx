const DEFAULT_GENRE = 21;

export const routes = {
  signIn: '/sign-in',
  favorites: '/favorites',
  default: `/search/${DEFAULT_GENRE}`,
  search: (id = null) => (id ? `/search/${id}` : '/search/:id'),
  artistDetail: (id = null) => (id ? `/artist/${id}` : '/artist/:id'),
};
