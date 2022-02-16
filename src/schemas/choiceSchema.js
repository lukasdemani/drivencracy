import joi from 'joi';

const choiceSchema = joi.object({
    title: joi.string().required(),
    poolId: joi.number()
  });
  
  export default choiceSchema;