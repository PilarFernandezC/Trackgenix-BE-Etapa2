import request from 'supertest';
import admin from '../models/Admin';
import app from '../app';
import admins from '../seeds/admins';

beforeAll(async () => {
  await admin.collection.insertMany(admins);
});

const mockedAdmin = {
  name: 'Tye',
  lastName: 'Haysar',
  email: 'thaysar0@miitbeian.gov.cn',
  password: 'E6HCIX',
};

describe('GET /admin', () => {
  test('should find all the admins', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(200);
  });
  test('should not find all the admins with a wrong route', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(404);
  });

  test('should find the admins filter by description', async () => {
    const response = await request(app).get(`/api/admin/?name=${mockedAdmin}`).send();
    expect(response.status).toBe(200);
  });
  test('should find the admins filter by date', async () => {
    const response = await request(app).get(`/api/admin/?lastName=${mockedAdmin}`).send();
    expect(response.status).toBe(200);
  });

  test('should find the admins filter by task', async () => {
    const response = await request(app).get(`/api/admin/?email=${mockedAdmin}`).send();
    expect(response.status).toBe(200);
  });
});
