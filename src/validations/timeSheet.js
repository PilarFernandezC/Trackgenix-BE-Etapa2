import Joi from 'joi';

const validateTimesheet = (req, res, next) => {
  const timesheetValidateUpdate = Joi.object({
    description: Joi.string().required(),
    date: Joi.date().required(),
    task: Joi.string().valid('BE', 'FE'),
  });

  const validation = timesheetValidateUpdate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was a validation error:',
      data: validation.error.details.map((x) => x.message).join(', '),
      error: true,
    });
  } return next();
};

export default validateTimesheet;
