import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminsSeed from '../seeds/superAdmin';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminsSeed);
});

const mockedSuperAdmin = {
  name: 'Maddy',
  lastName: 'Lincey',
  email: 'mlincey1@cornell.edu',
  password: 'Qvk23EHRkP',
};

const wrongMockedSuperAdmin = {
  name: 'Maddy',
  lastName: 'Lincey',
  email: 'mlincey1@cornell.edu',
  password: 'QP',
};

const superAdminId = '63543d4cfc13ae204b00003b';
const wrongSuperAdminId = '63543d4cfc13ae204b000000';
const getById = '63543d4cfc13ae204b000040';

describe('Test Super Admin - Create', () => {
  test('Correct Body - Should create a new super admin - Status code 201', async () => {
    const response = await request(app).post('/api/superAdmin').send(mockedSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('Super Admins created');
    expect(response.body.data).not.toBeUndefined();
    expect(response.body.error).toBeFalsy();
  });
  test('Without Body- Should not create a super admin - Status code 400', async () => {
    const response = await request(app).post('/api/superAdmin').send();
    expect(response.status).toBe(400);
    expect(response.body.message).not.toBeUndefined();
  });
  test('Wrong Body - Should not create a super admin - Status code 400', async () => {
    const response = await request(app).post('/api/superAdmin').send(wrongMockedSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).not.toBeUndefined();
  });
  test('Wrong Path - Should not create a super admin - Status code 404', async () => {
    const response = await request(app).post('/api/superadmi').send(mockedSuperAdmin);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
  });
});

describe('Test Super Admin - Delete', () => {
  test('Correct ID - Should delete a super admin - Status code 202', async () => {
    const response = await request(app).delete(`/api/superAdmin/${superAdminId}`);
    expect(response.status).toBe(204);
    expect(response.body.error).toBeFalsy();
  });
  test('Wrong ID - Should not delete a super admin - Status code 404', async () => {
    const response = await request(app).delete(`/api/superAdmin/${wrongSuperAdminId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('SuperAdmin not found');
  });
  test('Without ID - Should not delete a super admin - Status code 404', async () => {
    const response = await request(app).delete(`/api/superAdmin/${''}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
  });
  test('Wrong Path - Should not delete a super admin - Status code 404', async () => {
    const response = await request(app).post(`/api/supperAdmin/${superAdminId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
  });
});

describe('Test Super Admin - getById', () => {
  test('Correct ID - Should get a super admin - Status Code 200', async () => {
    const response = await request(app).get(`/api/superAdmin/${getById}`);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('Wrong ID - Should not get a super admin - Status Code 400', async () => {
    const response = await request(app).get(`/api/superAdmin/${wrongSuperAdminId}`);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('SuperAdmin not found');
  });
  test('Wrong Path - Should not get a super admin - Status code 404', async () => {
    const response = await request(app).get(`/api/supperAdmin/${superAdminId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
  });
});
