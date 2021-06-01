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

export async function addToMyList(movie) {
  const response = await request
    .post('/api/me/movies/list')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(movie);
  return response;
}

export async function getMyList() {
  const response = await request
    .get('/api/me/movies/list')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}

export async function getIsInMyList(movieId) {
  const response = await request
    .get(`/api/me/movies/list/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body ? true : false;
}

export async function deleteFromMyList(movieId) {
  const response = await request
    .delete(`/api/me/movies/list/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response;
}

export async function vote(movie) {
  debugger;
  const response = await request
    .post('/api/me/movies/votes')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(movie);
  debugger;
  return response;
}

export async function getMyVote(movieId) {
  debugger;
  const response = await request
    .get(`/api/me/movies/votes/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  debugger;
  if (response.body === null) {
    return { isUpVoted: false, isDownVoted: false };
  } else {
    const { favorite } = response.body;
    return favorite
      ? { isUpVoted: true, isDownVoted: false }
      : { isUpVoted: false, isDownVoted: true };
  }
}

export async function changeVote(movie) {
  debugger;
  const response = await request
    .put(`/api/me/movies/votes/${movie.movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send({ favorite: movie.favorite });
  debugger;
  return response;
}

export async function deleteVote(movieId) {
  debugger;
  const response = await request
    .delete(`/api/me/movies/votes/${movieId}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  debugger;
  return response;
}

export async function getVoteCounts(movieId) {
  const response = await request.get(`/api/movies/votes/${movieId}`);
  return response.body;
}

export async function myListHandler(movie, isInMyList) {
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
  const response = isInMyList
    ? await deleteFromMyList(movie.movieId)
    : await addToMyList(movie);
  if (response.status !== 200) {
    throw new Error(response.body);
  } else {
    return response.body;
  }
}

export async function voteHandler(movie, isUpVoted, isDownVoted, clicked) {
  if (!window.localStorage.getItem('TOKEN')) {
    window.alert('You must be logged in to vote for this movie');
    return { setState: false, isUpVoted, isDownVoted };
  }
  debugger;
  if (
    (isUpVoted && clicked === 'upVote') ||
    (isDownVoted && clicked === 'downVote')
  ) {
    // delete movie from table
    const response = await deleteVote(movie.movieId);
    if (response.status !== 200) {
      throw new Error(response.body);
    }
    // update the state flags
    isUpVoted = false;
    isDownVoted = false;
  } else if (
    (isUpVoted && clicked === 'downVote') ||
    (isDownVoted && clicked === 'upVote')
  ) {
    //change vote
    movie.favorite = clicked === 'upVote' ? true : false;
    const response = await changeVote(movie);
    if (response.status !== 200) {
      throw new Error(response.body);
    }
    // update the state flags
    isUpVoted = !isUpVoted;
    isDownVoted = !isDownVoted;
  } else {
    //update vote
    movie.favorite = clicked === 'upVote' ? true : false;
    //add movie to votes table
    const response = await vote(movie);
    if (response.status !== 200) {
      throw new Error(response.body);
    }
    // update the state flags
    clicked === 'upVote'
      ? (isUpVoted = !isUpVoted)
      : (isDownVoted = !isDownVoted);
  }
  debugger;
  return { setState: true, isUpVoted, isDownVoted };
}
