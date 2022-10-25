import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('635015885581eb421df09402'),
  name: 'TOY STORY',
  description: 'Hay una serpiente en mi bota',
  startDate: '2022-12-10T00:00:00.000+00:00',
  endDate: '2022-12-27T00:00:00.000+00:00',
  clientName: 'Andy',
  employees: [{
    employeeId: mongoose.Types.ObjectId('634d4ae6cc51b61f8d9c862e'),
    role: 'DEV',
    rate: 40,
  }],
}, {
  _id: mongoose.Types.ObjectId('635015885581eb421df093f0'),
  name: 'Lissa',
  description: 'vestibulum sed magna at nunc',
  startDate: '2012-01-09T00:00:00.000+00:00',
  endDate: '2022-12-18T00:00:00.000+00:00',
  clientName: 'Agimba',
  employees: [{
    employeeId: mongoose.Types.ObjectId('634d4e3982ba5c21599642f5'),
    role: 'DEV',
    rate: 120,
  }],
}, {
  _id: mongoose.Types.ObjectId('635015885581eb421df09420'),
  name: 'Nathaniel',
  description: 'amet justo morbi',
  startDate: '2012-01-09T00:00:00.000+00:00',
  endDate: '2022-12-18T00:00:00.000+00:00',
  clientName: 'Bluezoom',
  employees: [{
    employeeId: mongoose.Types.ObjectId('634d7e5757bc44f21a345463'),
    role: 'TL',
    rate: 110,
  }],
}, {
  _id: mongoose.Types.ObjectId('6350160d76dd03ff29e75dd3'),
  name: 'Nan',
  description: 'quisque porta',
  startDate: '2012-01-09T00:00:00.000+00:00',
  endDate: '2022-12-18T00:00:00.000+00:00',
  clientName: 'Gabtype',
  employees: [{
    employeeId: mongoose.Types.ObjectId('634d7e5757bc44f21a345462'),
    role: 'QA',
    rate: 233,
  }],
}];
