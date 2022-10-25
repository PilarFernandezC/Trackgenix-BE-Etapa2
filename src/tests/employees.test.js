import request from 'supertest';
import app from '../app';
import Employee from '../models/Employee';
import employeeSeed from '../seeds/employees';

beforeAll(async () => {
  await Employee.collection.insertMany(employeeSeed);
});

const employeeUser = {
  _id: '6354389ffc13ae2db7000326',
  name: 'Isahella',
  lastName: 'Lanfer',
  phone: '9616259010',
  email: 'ilanfer0@joomla.org',
  password: 'IW8uR6SapD',
};

describe('getAll /employees', () => {
  test('should get all the employees', async () => {
    const response = await request(app)
      .get('/api/employees/')
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('List of employees matching the query params was successfully retrieved.');
  });
  test('should filter the employees by name', async () => {
    const response = await request(app)
      .get(`/api/employees/?name=${employeeUser.name}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data)
      .toEqual(expect.arrayContaining([expect.objectContaining(employeeUser)]));
  });
  test('should filter the employees by lastName', async () => {
    const response = await request(app)
      .get(`/api/employees/?lastName=${employeeUser.lastName}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data)
      .toEqual(expect.arrayContaining([expect.objectContaining(employeeUser)]));
  });
  test('should filter the employees by email', async () => {
    const response = await request(app)
      .get(`/api/employees/?email=${employeeUser.email}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data)
      .toEqual(expect.arrayContaining([expect.objectContaining(employeeUser)]));
  });
  test('should filter the employees by phone', async () => {
    const response = await request(app)
      .get(`/api/employees/?phone=${employeeUser.phone}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data)
      .toEqual(expect.arrayContaining([expect.objectContaining(employeeUser)]));
  });

  test('should get error 404 if the route is incorrect', async () => {
    const response = await request(app)
      .get('/api/employee')
      .send();
    expect(response.status).toBe(404);
    expect(response.status.error).toBeUndefined();
  });
});
