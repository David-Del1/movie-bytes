import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    .ok((res) => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .ok((res) => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function discoverMovies(fetchUrl) {
  const response = await request
    .get(fetchUrl)
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

export async function fetchMovieDetail(movieId) {
  const response = await request
    .get(`/api/movies/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}

export async function getMyFavorites() {
  const response = await request
    .get('/api/me/movies/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}

export async function getMyList() {
  const response = await request
    .get('/api/me/movies/list')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  // console.log(`got your list: ${response.body}`);
  return response.body;
}

export async function isNewMovie(movieId) {
  const response = await request
    .get(`/api/me/movies/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body ? true : false;
}
export async function isMyFavorite(movieId) {
  const response = await request
    .get(`/api/me/movies/${movieId}/favorite`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  if (response.body === null) {
    return null;
  } else {
    const { favorite } = response.body;
    return favorite;
  }
}

export async function getIsInMyList(movieId) {
  const response = await request
    .get(`/api/me/movies/${movieId}/list`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  if (response.body === null) {
    return false;
  } else {
    const { myList } = response.body;
    return myList;
  }
}

export async function addMovie(movie) {
  return await request
    .post('/api/me/movies')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(movie);
}

export async function changeFavorite(movie) {
  return await request
    .put(`/api/me/movies/${movie.movieId}/favorite`)
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send({ favorite: movie.favorite });
}

export async function changeMyList(movie) {
  return await request
    .put(`/api/me/movies/${movie.movieId}/list`)
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send({ myList: movie.myList });
}
