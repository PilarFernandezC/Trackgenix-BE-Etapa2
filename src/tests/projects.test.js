import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

const mockedProject = {
  name: 'nulla suscipit',
  description: 'tincidunt ante',
  startDate: '01/07/2022',
  endDate: '12/29/2022',
  clientName: 'Abbey',
  employees: [{
    employeeId: '63544791fc13ae64f60000b5',
    role: 'DEV',
    rate: 300,
  }],
};

const wrongMockedProject = {
  name: 'nulla suscipit',
  description: 'tincidunt ante',
  startDate: '01/07/2022',
  endDate: '01/29/2022',
  clientName: 'Abbey',
  employees: [{
    employeeId: '63544791fc13ae64f60000b5',
    role: 'DEV',
    rate: 300,
  }],
};

describe('Test Project - Create', () => {
  test('Correct Body - Should create a new project with status code 201', async () => {
    const response = await request(app).post('/api/projects').send(mockedProject);
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('New Project created');
  });
  test('Without Body- Should not create a project with status code 400', async () => {
    const response = await request(app).post('/api/projects').send();
    expect(response.status).toBe(400);
    expect(response.body.message).not.toBeUndefined();
  });
  test('Wrong Body - Should not create a project with status code 400', async () => {
    const response = await request(app).post('/api/projects').send(wrongMockedProject);
    expect(response.status).toBe(400);
    expect(response.body.message).not.toBeUndefined();
  });
  test('Wrong Path - Should not create a project with status code 400', async () => {
    const response = await request(app).post('/api/projec').send(mockedProject);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
  });
});
