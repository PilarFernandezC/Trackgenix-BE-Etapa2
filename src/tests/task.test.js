import request from 'supertest';
import app from '../app';
import Task from '../models/Task';
import taskSeed from '../seeds/task';

beforeAll(async () => {
  await Task.collection.insertMany(taskSeed);
});

const taskInvalidId = '6354389ffc13ae2db7004444';
const TaskWithId = {
  _id: '63544114fc13ae2db7000330',
  description: 'FE',
};

describe('getAll /tasks', () => {
  test('should get all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks/')
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Tasks found');
  });
  test('should filter tasks by description', async () => {
    const response = await request(app)
      .get(`/api/tasks/?description=${TaskWithId.description}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data)
      .toEqual(expect.arrayContaining([expect.objectContaining(TaskWithId)]));
  });

  test('should get error 404 if the route is incorrect', async () => {
    const response = await request(app)
      .get('/api/task/')
      .send();
    expect(response.status).toBe(404);
    expect(response.status.error).toBeUndefined();
  });
});

describe('getById /tasks', () => {
  test('should get a task by ID', async () => {
    const response = await request(app)
    // eslint-disable-next-line no-underscore-dangle
      .get(`/api/tasks/${TaskWithId._id}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toEqual(TaskWithId);
  });
  test('should not find a task with the ID given thus return error 404', async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskInvalidId}`)
      .send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});
