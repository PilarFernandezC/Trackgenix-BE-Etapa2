import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

const idProject = '635015885581eb421df09402';
const idInvalid = '635015885581eb421df09404';

describe('Projects - Unit test', () => {
});

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('GET /projects', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Projects found');
  });
});

describe('GET BY ID /:id', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get(`/projects/${idProject}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
});

describe('GET BY ID ERROR /:id', () => {
  test('should return status code 400', async () => {
    const response = await request(app).get(`/projects/${idInvalid}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe(`${response.body.message}`);
  });
});
