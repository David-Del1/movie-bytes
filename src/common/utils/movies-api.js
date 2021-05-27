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

export async function isMyFavorite(movieId) {
  const response = await request
    .get(`/api/me/movies/${movieId}/favorite`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}

export async function isInMyList(movieId) {
  const response = await request
    .get(`/api/me/movies/${movieId}/list`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  if (response.body === null) {
    // console.log(`you need to add ${movieId} to your movies`);
    return false;
  } else {
    const { myList } = response.body;
    // console.log(`${movieId} ${myList ? 'is' : 'is not'} in your list`);
    return myList;
  }
}

export async function addMovie(movie) {
  const response = await request
    .post('/api/me/movies')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(movie);
  return response;
}

export async function changeFavorite(movie) {
  const response = await request
    .put(`/api/me/movies/${movie.movieId}/favorite`)
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send({ favorite: movie.favorite });
  return response;
}

export async function changeMyList(movie) {
  if (await isInMyList(movie.movieId)) {
    // console.log(`changing ${movie.movieId}'s myList to ${!movie.myList}`);
    return await request
      .put(`/api/me/movies/${movie.movieId}/list`)
      .set('Authorization', window.localStorage.getItem('TOKEN'))
      .send({ myList: !movie.myList });
  } else {
    movie.myList = true;
    // console.log(`adding ${movie.movieId} to your movies`);
    return await addMovie(movie);
  }
}
