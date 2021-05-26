import request from 'superagent';
//const URL = 'http://localhost:8001';
const URL = '';

export async function signUp(credentials) {
  const response = await request
    .post(`${URL}/api/auth/signup`)
    .ok((res) => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post(`${URL}/api/auth/signin`)
    .ok((res) => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function discoverMovies(fetchUrl) {
  const response = await request
    .get(URL + fetchUrl)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function searchMovies(search) {
  const response = await request
    .get('/api/movies')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .query({ search: search });

  return response.body;
}

export async function getMyFavorites() {
  const response = await request
    .get('/api/me/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function fetchMovieDetail(movieId) {
  const response = await request
    .get(`${URL}/api/movie/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}

export async function isMyFavorite(movieId) {
  const response = await request
    .get(`/api/me/favorites/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body.length > 0;
}

export async function addFavorite(favorite) {
  const response = await request
    .post('/api/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(favorite);

  return response;
}

export async function deleteFavorite(id) {
  const response = await request
    .delete(`/api/favorites/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response;
}

export async function favoritesHandler(movie, isFavorite, favorites) {
  try {
    if (isFavorite) {
      const response = await addFavorite(movie);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      const favorite = response.body;
      // add artwork to favorites array
      favorites.splice(1, 0, favorite);
    } else {
      // find the artwork id to delete
      let index = 0;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].movieId === movie.movieId) {
          index = i;
          break;
        }
      }
      const favoriteId = favorites[index].id;
      const response = await deleteFavorite(favoriteId);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      // delete the artwork from favorites array
      favorites.splice(index, 1);
    }
  } catch (err) {
    console.log(err.message);
  }
  return favorites;
}
