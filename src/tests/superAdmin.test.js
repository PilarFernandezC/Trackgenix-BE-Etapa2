import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeeds from '../seeds/superAdmin';

const name = 'Maddy';
const lastName = 'Bretherick';
const email = 'abretherick0@bluehost.com';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeeds);
});

describe('GET /superAdmin', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/api/superAdmin/').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('SuperAdmins found');
  });
  test('Find SuperAdmin filter by name', async () => {
    const response = await request(app).get(`/api/superAdmin/?description=${name}`).send();
    expect(response.status).toBe(200);
  });
  test('Find SuperAdmin filter by last name', async () => {
    const response = await request(app).get(`/api/superAdmin/?description=${lastName}`).send();
    expect(response.status).toBe(200);
  });
  test('Find SuperAdmin filter by email', async () => {
    const response = await request(app).get(`/api/superAdmin/?description=${email}`).send();
    expect(response.status).toBe(200);
  });
});
