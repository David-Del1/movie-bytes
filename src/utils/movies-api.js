import request from 'superagent';
const URL = ''; //maybe move to .env

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
    .post('/api/auth/signin')
    .ok((res) => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function fetchMovieData() {
  const response = await request.get(fetchUrl);
  // setMovies(response.data.results);
  return response;
}

export default URL;
