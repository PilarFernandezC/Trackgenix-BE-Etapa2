import Joi from 'joi';

const createValidation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).pattern(/^[\p{L}]+$/u).required(),
    lastName: Joi.string().min(3).pattern(/^[\p{L}]+$/u).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error ${validation.error.details[0].message}`,
    });
  }
  return next();
};
export default { createValidation };
