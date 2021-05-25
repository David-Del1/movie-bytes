import request from 'superagent'; 
const URL = 'http://localhost:8001';

export async function signUp(credentials) {

  const response = await request
    .post(`${URL}/api/auth/signup`)
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request.post(`${URL}/api/auth/signin`)
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function fetchMovieData(fetchUrl) {
  const response = await
    request.get(URL + fetchUrl)
      .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export default URL;