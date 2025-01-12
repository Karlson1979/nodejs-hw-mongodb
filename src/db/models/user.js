import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';
const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Імʼя обовʼязкове'] },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegexp, 'Введіть дійсний email'],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Пароль обов’язковий'],
    },
  },
  { timestamps: true, versionKey: false },
);
userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);
export const UsersCollection = model('user', userSchema);
