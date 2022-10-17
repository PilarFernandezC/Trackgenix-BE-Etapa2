import Joi from 'joi';

const taskValidateUpdate = Joi.object({
  description: Joi.string().valid(
    'BE',
    'FE',
  ).required(),
});

const updateTaskValidation = (req, res, next) => {
  const validation = taskValidateUpdate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was a validation error:',
      data: validation.error.details.map((x) => x.message).join(', '),
      error: true,
    });
  } return next();
};

export default updateTaskValidation;
