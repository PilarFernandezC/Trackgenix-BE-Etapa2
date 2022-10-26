import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeeds from '../seeds/superAdmin';

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
});
