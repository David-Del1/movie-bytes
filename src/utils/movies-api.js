import request from 'superagent';

export async function signUp(credentials) {

  const response = await request
    .post('/api/auth/signup')
    .ok(res => res.status < 500)
    .send(credentials);

    if(response.status === 400) {
      throw response.body
    }

    return response.body;
}


export async function signIn(credentials) {
  const response = await request.post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

    if (response.status === 400) {
      throw response.body;
    }

    return response.body;
}

