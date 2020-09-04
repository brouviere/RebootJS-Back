import { Document, Schema, model, Model} from 'mongoose';
import { string } from '@hapi/joi';

export interface IProfile extends Document {
  email: string;
  firstname: string;
  lastname: string;
}

const profileSchema = new Schema({
  email: {
    type: string,
    required: true,
    unique: true
  },
  firstname: {
    type: string,
    required: true,
  },
  lastname: {
    type: string,
    required: true,
  }
});

export const Profile = model<IProfile>('profile', profileSchema);