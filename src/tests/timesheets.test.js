import request from 'supertest';
// import timesheetValidation from '../validations/timeSheet';
import app from '../app';
import Timesheet from '../models/TimeSheet';
import timesheetSeeds from '../seeds/timesheets';
import Task from '../models/Task';
import taskSeeds from '../seeds/task';
import Project from '../models/Projects';
import projectSeeds from '../seeds/projects';
import Employee from '../models/Employee';
import employeeSeeds from '../seeds/employees';
/* eslint no-underscore-dangle: 0 */
// let insertedEmployees = [];
// let insertedTasks = [];
// let insertedProjects = [];
let insertedTimesheets = [];

const seedDB = async () => {
  const objectIdMaptoArray = (map, size) => {
    const array = [];
    for (let i = 0; i < size; i += 1) {
      array.push(map[i].toString());
    }
    return array;
  };
  await new Promise((resolve, reject) => {
    const done = {
      employees: false,
      tasks: false,
      projects: false,
      timesheets: false,
    };
    const finishSeeding = () => {
      if (done.employees
        && done.tasks
        && done.projects
        && done.timesheets) resolve(true);
    };
    Employee.insertMany(employeeSeeds, { rawResult: true }, (error, response) => {
      done.employees = !error;
      if (!error && employeeSeeds.length === response.insertedCount) {
        // insertedEmployees = objectIdMaptoArray(response.insertedIds, response.insertedCount);
        finishSeeding();
      } else reject(error);
    });
    Task.insertMany(taskSeeds, { rawResult: true }, (error, response) => {
      done.tasks = !error;
      if (!error && taskSeeds.length === response.insertedCount) {
        // insertedTasks = objectIdMaptoArray(response.insertedIds, response.insertedCount);
        finishSeeding();
      } else reject(error);
    });
    Project.insertMany(projectSeeds, { rawResult: true }, (error, response) => {
      done.projects = !error;
      if (!error && projectSeeds.length === response.insertedCount) {
        // insertedProjects = objectIdMaptoArray(response.insertedIds, response.insertedCount);
        finishSeeding();
      } else reject(error);
    });
    const trimmedTimesheets = timesheetSeeds.slice(0, -7); // 7 tests
    Timesheet.insertMany(trimmedTimesheets, { rawResult: true }, (error, response) => {
      done.timesheets = !error;
      if (!error && trimmedTimesheets.length === response.insertedCount) {
        insertedTimesheets = objectIdMaptoArray(response.insertedIds, response.insertedCount);
        finishSeeding();
      } else reject(error);
    });
  });
};

// const validateTSData = async (TSobj) => {
//   const { error, value } = timesheetValidation.validate(TSobj);
//   return error === undefined;
// };

// const validateMongoDBId = (idString) => {
//   try {
//     const oid = new ObjectId(id);
//     return ObjectId.isValid(id)
//         && oid.toString() === id;
//   } catch {
//     return false;
//   }
// };

beforeEach(async () => {
  await seedDB();
});

afterEach(async () => {
  Employee.collection.drop();
  Task.collection.drop();
  Project.collection.drop();
  Timesheet.collection.drop();
//   insertedEmployees = [];
//   insertedTasks = [];
//   insertedProjects = [];
//   insertedTimesheets = [];
});

describe('[POST] /api/timesheets/ endpoint => CREATE a timesheet.', () => {
  const timesheetTestItems = timesheetSeeds.slice(-7); // 7 tests
  test('sending ALL required data fields (nominal)', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] 1/api/timesheets failed response';
    const payload = timesheetTestItems[0]; // select any of the seeds
    delete payload._id;
    response = await request(app).post('/api/timesheets/').type('json')
      .send(JSON.stringify(payload));
    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/created/);
    expect(response.body.data).toBeTruthy();
    expect(response.body.error).toBeUndefined();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore < response.body.data.length).toBeTruthy();
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] 3/api/timesheets failed response';
  });

  test('sending only SOME data fields (not allowed) ', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = timesheetTestItems[1]; // select any of the seeds
    delete payload._id;
    delete payload.description;
    response = await request(app).post('/api/timesheets/').type('json')
      .send(JSON.stringify(payload));
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/error/);
    expect(response.body.error).toBeTruthy();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore === response.body.data.length).toBeTruthy();
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('with ALL fields and an UNEXPECTED ID path param (not allowed)', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = timesheetTestItems[2]; // select any of the seeds
    const unnecessaryId = payload._id;
    delete payload._id;
    response = await request(app).post(`/api/timesheets/${unnecessaryId}`)
      .send(JSON.stringify(payload));
    expect(response.status).toBe(404);
    expect(response.body.message).toBeUndefined();
    expect(response.body.error).toBeUndefined();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore === response.body.data.length).toBeTruthy();
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('with ALL fields and an UNEXPECTED ID PROPERTY in request body (not allowed)', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = timesheetTestItems[3]; // select any of the seeds
    response = await request(app).post('/api/timesheets/')
      .send(JSON.stringify(payload));
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/error/);
    expect(response.body.error).toBeTruthy();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore === response.body.data.length).toBeTruthy();
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('with ALL fields and UNEXPECTED and relevant query params (no effect)', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = timesheetTestItems[4]; // select any of the seeds
    delete payload._id;
    const queryParam = { hours: payload.hours };
    response = await request(app).post('/api/timesheets/')
      .query(queryParam)
      .type('json')
      .send(payload);
    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/created/);
    expect(response.body.data).toBeTruthy();
    expect(response.body.error).toBeUndefined();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore < response.body.data.length).toBeTruthy();
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('<hours> OUT OF RANGE (not allowed)', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = timesheetTestItems[5]; // select any of the seeds
    delete payload._id;
    payload.hours = 13;
    response = await request(app).post('/api/timesheets/')
      .send(JSON.stringify(payload));
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/error/);
    expect(response.body.error).toBeTruthy();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore === response.body.data.length).toBeTruthy();
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('<date> is LATER THAN TODAY (not allowed)', async () => {
    let countBefore;
    let response = await request(app).get('/api/timesheets');
    if (response.ok) {
      countBefore = response.body.data.length;
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = timesheetTestItems[6]; // select any of the seeds
    delete payload._id;
    const today = new Date();
    const newDate = new Date();
    newDate.setFullYear(today.getFullYear() + 1);
    const dateStr = `${newDate.getMonth()}/${newDate.getDay()}/${newDate.getFullYear()}`;
    payload.date = dateStr;
    response = await request(app).post('/api/timesheets/')
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/error/);
    expect(response.body.error).toBeTruthy();
    response = await request(app).get('/api/timesheets/');
    if (response.ok) {
      expect(countBefore === response.body.data.length).toBeTruthy();
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });
});

describe('[PUT] /api/timesheets/:id endpoint => UPDATE/EDIT a timesheet.', () => {
  const depopulateTimesheet = (TS) => ({
    ...TS,
    employee: TS.employee && TS.employee._id ? TS.employee._id : TS.employee,
    task: TS.task && TS.task._id ? TS.task._id : TS.task,
    project: TS.project && TS.project._id ? TS.project._id : TS.project,
  });
  test('with a VALID EXISTENT ID and ALL VALID DATA FIELDS sent in the body (NOMINAL)', async () => {
    const index = 0;
    const id = insertedTimesheets[index];
    let response = await request(app).get(`/api/timesheets/${id}`);
    let oldDocument;
    if (response.ok) {
      oldDocument = depopulateTimesheet(response.body.data);
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = oldDocument;
    // none of this properties are allowed in the request body
    delete payload._id;
    delete payload.__v;
    delete payload.createdAt;
    delete payload.updatedAt;
    payload.description = '-altered data-';
    payload.hours = 5;
    response = await request(app).put(`/api/timesheets/${id}`)
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.msg).toMatch(/Updated/);
    expect(response.body.error).toBeUndefined();
    response = await request(app).get(`/api/timesheets/${id}`);
    if (response.ok) {
      expect(depopulateTimesheet(response.body.data)).toMatchObject(payload);
      // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('with a VALID EXISTENT ID and SOME VALID DATA FIELDS sent in the body (NOMINAL)', async () => {
    const index = 1;
    const id = insertedTimesheets[index];
    let response = await request(app).get(`/api/timesheets/${id}`);
    let oldDocument;
    if (response.ok) {
      oldDocument = depopulateTimesheet(response.body.data);
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = {};
    // none of this properties are allowed in the request body
    delete oldDocument._id;
    delete oldDocument.__v;
    delete oldDocument.createdAt;
    delete oldDocument.updatedAt;
    payload.description = '-more altered data-';
    oldDocument.description = payload.description;
    payload.hours = 1;
    oldDocument.hours = payload.hours;
    response = await request(app).put(`/api/timesheets/${id}`)
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.msg).toMatch(/Updated/);
    expect(response.body.error).toBeUndefined();
    response = await request(app).get(`/api/timesheets/${id}`);
    if (response.ok) {
      expect(depopulateTimesheet(response.body.data)).toMatchObject(oldDocument);
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });

  test('with a VALID EXISTENT ID and SOME INVALID DATA FIELDS sent in the body (NOT NOMINAL)', async () => {
    const index = 2;
    const id = insertedTimesheets[index];
    let response = await request(app).get(`/api/timesheets/${id}`);
    let oldDocument;
    if (response.ok) {
      oldDocument = depopulateTimesheet(response.body.data);
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
    const payload = {};
    // none of this properties are allowed in the request body
    delete oldDocument._id;
    delete oldDocument.__v;
    delete oldDocument.createdAt;
    delete oldDocument.updatedAt;
    payload.description = '-more altered data-';
    payload.hours = 1;
    payload.irrelevant = 'dummy text';
    payload.unrelated = -54;
    response = await request(app).put(`/api/timesheets/${id}`)
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/error/);
    expect(response.body.error).toBeTruthy();
    response = await request(app).get(`/api/timesheets/${id}`);
    if (response.ok) {
      expect(depopulateTimesheet(response.body.data)).toMatchObject(oldDocument);
    // eslint-disable-next-line no-throw-literal
    } else throw '[GET] /api/timesheets failed response';
  });
  test('with an VALID NON-EXISTENT ID and ALL DATA FIELDS sent in the body (FAILS)', () => {
    expect(true).toBeTruthy();
  });
  test('with an INVALID ID and ALL DATA FIELDS sent in the body (FAILS)', () => {
    expect(true).toBeTruthy();
  });
  test('WITHOUT an ID and ALL DATA FIELDS sent in the body', () => {
    expect(true).toBeTruthy();
  });
});
