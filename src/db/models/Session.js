import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    //     userId - string, required
    // accessToken - string, required
    // refreshToken - string, required
    // accessTokenValidUntil - Date, required
    // refreshTokenValidUntil - Date, required
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
sessionSchema.post('save', handleSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateSettings);
sessionSchema.post('findOneAndUpdate', handleSaveError);
const SessionCollection = model('session', sessionSchema);
export default SessionCollection;
