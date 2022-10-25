import request from 'supertest';
import admin from '../models/Admin';
import app from '../app';
import admins from '../seeds/admins';

beforeAll(async () => {
  await admin.collection.insertMany(admins);
});

// const adminId = '635437ebfc13ae2db70002b8'
const mockedAdmin = {
  _id: '635437ebfc13ae2db70002b8',
  name: 'Tye',
  lastName: 'Haysar',
  email: 'thaysar0@miitbeian.gov.cn',
  password: 'E6HCIX',
};

describe('GET /admin', () => {
  test('should get all the admins', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.body.data).toBeDefined();
    expect(response.status).toBe(200);
  });
  test('should not get all the admins with a wrong route', async () => {
    const response = await request(app).get(`/api/admins/?name=${mockedAdmin.name}`).send();
    expect(response.status).toBe(404);
  });

  test('should find the admins filter by description', async () => {
    const response = await request(app).get(`/api/admin/?name=${mockedAdmin.lastName}`).send();
    expect(response.status).toBe(200);
  });
  test('should find the admins filter by date', async () => {
    const response = await request(app).get(`/api/admin/?lastName=${mockedAdmin.email}`).send();
    expect(response.status).toBe(200);
  });

  test('should find the admins filter by task', async () => {
    const response = await request(app).get(`/api/admin/?email=${mockedAdmin}`).send();
    expect(response.status).toBe(200);
  });
});
