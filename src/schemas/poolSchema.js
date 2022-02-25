import joi from 'joi';

const poolSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string().allow("")
  });
  
export default poolSchema;