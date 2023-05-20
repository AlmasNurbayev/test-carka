import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const userLogin = {
  email: String(process.env.TEST_LOGIN),
  password: String(process.env.TEST_PASSWORD)
}
const url = String(process.env.TEST_URL);
let token: string;

describe('auth rest', () => {

  it(url + '/api/auth (POST)', async () =>{
    const response = await request(url).post('/api/auth').send(userLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');   
    token = 'Bearer ' + response.body.token;
  });
  
  it(url + '/api/graphQL (query users)', async () =>{
    const query = 
    ` query { users  {
      id 
      email
      create_date
      password
      role
      name
    } 
    } `;
    const response = await request(url)
    .post('/api/graphQL')
    .set('Authorization', token)
    .send({query});
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('users');
    expect(response.body.data.users.length).toBeGreaterThan(0);
    
  });


});
