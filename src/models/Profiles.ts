import { Document, Schema, model, Model} from 'mongoose';

export interface IProfile extends Document {
  email: String;
  firstname: String;
  lastname: String;
}

const profileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  }
});

export const Profile = model<IProfile>('profile', profileSchema);