import request from 'supertest';
import timesheet from '../models/TimeSheet';
import app from '../app';
import timeSheetSeed from '../seeds/timesheets';

beforeAll(async () => {
  await timesheet.collection.insertMany(timeSheetSeed);
});

const timesheetId = '6354438cfc13ae204b000060';

// const mockedTimesheet ={
//     description: 'vitae nisl aenean',
//     date: '1/1/2022',
//     task: mongoose.Types.ObjectId('63546010fc13ae3a75000196'),
//     employee: mongoose.Types.ObjectId('6354438cfc13ae204b000061'),
//     project: mongoose.Types.ObjectId('6354438cfc13ae204b000062'),
//     hours: 81
// }

describe('DELETE /timesheet/:id', () => {
  test('should delete an employee', async () => {
    const response = await request(app).delete(`/api/timesheets/${timesheetId}`).send();
    expect(response.status).toBe(204);
  });
  test("if I don't pass the id the response should be a status 404", async () => {
    const response = await request(app).delete('/api/timesheets/').send();
    expect(response.status).toBe(404);
  });
  test('response status should be 404 with a wrong route ', async () => {
    const response = await request(app).delete(`/api/timesheet/${timesheetId}`).send();
    expect(response.status).toBe(404);
  });
  test('response status should be 404 with a wrong id', async () => {
    const response = await request(app).delete('/api/timesheets/6356efc2fc13ae56b9000014').send();
    expect(response.status).toBe(404);
  });
});
