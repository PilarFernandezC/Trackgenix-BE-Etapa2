import request from 'supertest';
import app from '../app';
import Employee from '../models/Employee';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employee.collection.insertMany(employeesSeed);
});

const employeeValidId = '6354389ffc13ae2db7000326';
let employeeInvalidId = '6354389ffc13ae2db7004444';
const mockedEmployee = {
  name: 'Isahella',
  lastName: 'Lanfer',
  phone: '9616259010',
  email: 'ilanfer0@joomla.org',
  password: 'IW8uR6SapD',
};

describe('POST /employees', () => {
  test('With an correct user the response should return a status 201', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send(mockedEmployee);
    expect(response.status).toBe(201);
  });

  test('With an correct user the response should return a error false', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send(mockedEmployee);
    expect(response.body.error).toBeFalsy();
  });

  test('With an correct user the response should return a not undefined data', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send(mockedEmployee);
    expect(response.body.data).not.toBeUndefined();
  });

  test('With an correct user the response should return a correct message', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send(mockedEmployee);
    expect(response.body.message).toEqual('New employee successfully created.');
  });

  test('name length min 3', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send(mockedEmployee);
    expect(response.body.data.name.length).toBeGreaterThan(3);
  });
});

describe('DELETE /employees/:id', () => {
  test('With an empty id the response should return a status 400', async () => {
    const response = await request(app)
      .delete(`/api/employees/${employeeInvalidId = null}`)
      .send();
    expect(response.status).toBe(400);
  });

  test('With an incorrect route the response should return a status 404', async () => {
    const response = await request(app)
      .delete(`/api/empls/${employeeInvalidId}`)
      .send();
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a status 404', async () => {
    const response = await request(app)
      .delete('/api/employees/')
      .send({});
    expect(response.status).toBe(404);
  });

  test('With an nonexistent id the response should return a data undefined', async () => {
    const response = await request(app)
      .delete('/api/employees/62898d14882f8759987fz59')
      .send();
    expect(response.body.data).toBeUndefined();
  });

  test('With an nonexistent id the response should return a non empty message', async () => {
    const response = await request(app)
      .delete('/api/employees/62898d14882f8759987fz59')
      .send();
    expect(response.body.message).toEqual(
      'An error has ocurred: CastError: Cast to ObjectId failed for value "62898d14882f8759987fz59" (type string) at path "_id" for model "Employees"',
    );
  });

  test('With an correct id the response should return a status 204', async () => {
    const response = await request(app)
      .delete(`/api/employees/${employeeValidId}`)
      .send();
    expect(response.status).toBe(204);
  });
});
