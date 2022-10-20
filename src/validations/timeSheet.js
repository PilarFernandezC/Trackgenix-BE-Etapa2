import Joi from 'joi';

const TimeSheetValidateUpdate = (req, res, next) => {
  const taskValidation = Joi.object({
    description: Joi.string().valid('BE', 'FE').required(),
  });

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      error: true,
    });
  }
  return next();
};

export default TimeSheetValidateUpdate;