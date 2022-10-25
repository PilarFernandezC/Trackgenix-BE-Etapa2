import request from 'supertest';
import app from '../app';
import Employee from '../models/Employee';
import employeeSeed from '../seeds/employees';

beforeAll(async () => {
  await Employee.collection.insertMany(employeeSeed);
});

const employeeInvalidId = '6354389ffc13ae2db7004444';
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

describe('getById /employees', () => {
  test('should get an employee by ID', async () => {
    const response = await request(app)
    // eslint-disable-next-line no-underscore-dangle
      .get(`/api/employees/${employeeUser._id}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toEqual(employeeUser);
  });
  test('should not find an employee with the ID given thus return error 404', async () => {
    const response = await request(app)
      .get(`/api/employees/${employeeInvalidId}`)
      .send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});
