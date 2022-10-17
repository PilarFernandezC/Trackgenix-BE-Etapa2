const Joi = require('joi');

const employeeJoiSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .messages({
      'string.pattern.base':
        'For property \'name\' : \'{name}\' all characters must be letters.',
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

async function employeeValidatorMiddleware(req, res, next) {
  try {
    await employeeJoiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: `Data could not be validated: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
}

export default employeeValidatorMiddleware;
