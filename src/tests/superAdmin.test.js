import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeeds from '../seeds/superAdmin';

const name = 'Maddy';
const lastName = 'Bretherick';
const email = 'abretherick0@bluehost.com';

const badReqId = '63540469873594f152b2ad3csda';
const reqId = '63543d4cfc13ae204b000039';

const mockedSuperAdmin = {
  name: 'Maddy',
  lastName: 'Lincey',
  email: 'mlincey1@cornell.edu',
  password: 'Qvk23EHRkP',
};

const mockedIdSuperAdmin = {
  _id: '63543d4cfc13ae204b000039',
  name: 'Maddy',
  lastName: 'Lincey',
  email: 'mlincey1@cornell.edu',
  password: 'Qvk23EHRkP',
};

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

describe('PUT /superAdmin', () => {
  test('should return status 200', async () => {
    const response = await request(app).put(`/api/superAdmin/${reqId}`).send(mockedSuperAdmin);
    expect(response.status).toBe(200);
  });

  test('should return error fasle', async () => {
    const response = await request(app).put(`/api/superAdmin/${reqId}`).send(mockedSuperAdmin);
    expect(response.body.error).toBeFalsy();
  });

  test('bodys should be the same', async () => {
    const response = await request(app).put(`/api/superAdmin/${reqId}`).send(mockedSuperAdmin);
    expect(response.body.data).toEqual(mockedIdSuperAdmin);
  });

  test('check for success message', async () => {
    const response = await request(app).put(`/api/superAdmin/${reqId}`).send(mockedSuperAdmin);
    expect(response.body.message).toEqual('SuperAdmin edited.');
  });

  test('should return status 400', async () => {
    const response = await request(app).put('/api/superAdmin/63540469873594f152b2ad3csda').send(mockedSuperAdmin);
    expect(response.status).toBe(400);
  });

  test('should return error true', async () => {
    const response = await request(app).put(`/api/superAdmin/${badReqId}`).send(mockedSuperAdmin);
    expect(response.body.error).toBe(undefined);
  });
  test('should return data undefined', async () => {
    const response = await request(app).put(`/api/superAdmin/${badReqId}`).send(mockedSuperAdmin);
    expect(response.body.data).toBe(undefined);
  });

  test('should return status 404', async () => {
    const response = await request(app).put('/api/superAdmin/63540469873594f152b2ad3csda').send(mockedSuperAdmin);
    expect(response.status).toBe(400);
  });
});
