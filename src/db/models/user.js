import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';
const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegexp, 'Enter a valid email'],
    },
    password: {
      type: String,

      required: [true, 'Password is required'],
    },
  },
  { timestamps: true, versionKey: false },
);
userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);
export const UsersCollection = model('user', userSchema);
