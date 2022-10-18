import Joi from 'joi';

const createValidation = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string()
      .required()
      .pattern(/^[\p{L}]+$/u)
      .min(3)
      .messages({
        'string.pattern.base': 'For property \'name\' : \'{name}\' all characters must be letters.',
      }),
    lastName: Joi.string()
      .required()
      .pattern(/^[\p{L}]+$/u)
      .min(3)
      .messages({
        'string.pattern.base': 'For property \'lastName\' : \'{lastName}\' all characters must be letters.',
      }),
    phone: Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
      .min(9)
      .messages({
        'string.pattern.base': 'For property \'phone\' : \'{phone}\' all characters must be digits.',
      }),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .alphanum()
      .min(8),
  });
  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Error: ${validation.error.details[0].message}`,
    });
  }
  return next();
};

export default { createValidation };
