import Joi from 'joi';

const TimesheetValidateUpdate = Joi.object({
  task: Joi.string().valid(
    'BE',
    'FE',
  ),
  description: Joi.string().required(),
  date: Joi.date().required(),
});

const updateTimesheetValidation = (req, res, next) => {
  const validation = TimesheetValidateUpdate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was a validation error:',
      data: validation.error.details.map((x) => x.message).join(', '),
      error: true,
    });
  } return next();
};

export default updateTimesheetValidation;
