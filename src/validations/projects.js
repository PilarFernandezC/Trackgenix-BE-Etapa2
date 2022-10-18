import Joi from 'joi';

const createValidation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    starDate: Joi.date().required(),
    endDate: Joi.date().greater('now').required(),
    clientName: Joi.string().required(),
    employee: [{
      employeeId: Joi.string().required(),
      role: Joi.string().valid('DEV', 'PM', 'QA', 'TL').required(),
      rate: Joi.number().required(),
    }],
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
