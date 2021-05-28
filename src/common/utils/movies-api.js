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
  const response = await request.get(fetchUrl);
  return response.body;
}

export async function searchMovies(search) {
  const response = await request.get('/api/movies').query({ search: search });
  return response.body;
}

export async function fetchMovieDetail(movieId) {
  const response = await request.get(`/api/movies/${movieId}`);
  return response.body;
}

export async function fetchMovieTrailerId(movieId) {
  const response = await request.get(`/api/movies/preview/${movieId}`);
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
  return response.body;
}

export async function isNewMovie(movieId) {
  const response = await request
    .get(`/api/me/movies/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body ? false : true;
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

export async function toggleMyListHandler(movie, isInMyList) {
  if (
    isInMyList &&
    !window.confirm(
      'Are you sure you wish to remove this movie from your list?'
    )
  )
    return null;
  if (!window.localStorage.getItem('TOKEN')) {
    window.alert('You must be logged in to add this movie to your list');
    return null;
  }
  movie.myList = !isInMyList;
  const response = (await isNewMovie(movie.movieId))
    ? await addMovie(movie)
    : await changeMyList(movie);
  if (response.status !== 200) {
    throw new Error(response.body);
    return null;
  }
  return response.body;
}

async function updateFavorite(movie) {
  const newMovie = await isNewMovie(movie.movieId);
  if (newMovie) movie.myList = false;
  const response = (await isNewMovie(movie.movieId))
    ? await addMovie(movie)
    : await changeFavorite(movie);
  if (response.status !== 200) {
    throw new Error(response.body);
    return false;
  }
  return true;
}

export async function voteHandler(movie, upVote, downVote, clicked) {
  if (!window.localStorage.getItem('TOKEN')) {
    window.alert('You must be logged in to upvote this movie');
    return { setState: false, upVote, downVote };
  }
  let isUpVoted = upVote,
    isDownVoted = downVote;
  if (clicked === 'upVote') {
    if (isUpVoted) {
      isUpVoted = false;
      movie.favorite = null;
    } else {
      movie.favorite = true;
      isUpVoted = true;
      isDownVoted = false;
    }
  } else {
    if (isDownVoted) {
      isDownVoted = false;
      movie.favorite = null;
    } else {
      movie.favorite = false;
      isUpVoted = false;
      isDownVoted = true;
    }
  }
  const setState = await updateFavorite(movie);
  return { setState, isUpVoted, isDownVoted };
}

export async function getVoteCounts(movieId) {
  const response = await request.get(`/api/movies/${movieId}/votes`);
  return response.body;
}
