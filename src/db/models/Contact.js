import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const ContactCollection = model('Contact', contactSchema);
export default ContactCollection;
