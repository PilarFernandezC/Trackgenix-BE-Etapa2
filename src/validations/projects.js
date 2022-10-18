function dummyValidator(req, res, next) {
  next();
}

export default {
  update: dummyValidator,
};
