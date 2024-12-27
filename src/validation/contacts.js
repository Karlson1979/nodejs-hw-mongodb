import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(13).max(13).required().messages({
    'string.length':
      'Phone number must be exactly 13 characters in the format +380000000000',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});
