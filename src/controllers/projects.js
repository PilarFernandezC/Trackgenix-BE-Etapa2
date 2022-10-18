function dummyDBgetOne(req, res) {
  res.send('dummyDBgetOne');
}

function dummyDBupdate(req, res) {
  res.send('dummyDBupdate');
}

function dummyDBdelete(req, res) {
  res.send('dummyDBdelete');
}

export default {
  getOne: dummyDBgetOne,
  update: dummyDBupdate,
  delete: dummyDBdelete,
};
