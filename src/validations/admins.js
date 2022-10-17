import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
  });

  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error:${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validateCreation,
};
