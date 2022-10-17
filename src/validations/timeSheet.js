import Joi from 'joi';

const TSValidateUpdate = Joi.object({
  task: Joi.string().valid(
    'BE',
    'FE',
  ),
});

const updateTSValidation = (req, res, next) => {
  const validation = TSValidateUpdate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was a validation error:',
      data: validation.error.details.map((x) => x.message).join(', '),
      error: true,
    });
  } return next();
};

export default { updateTSValidation };
