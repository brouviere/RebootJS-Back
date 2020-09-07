import { Document, Schema, model, Model} from 'mongoose';
import { SHA256 } from 'crypto-js';

export interface IProfile extends Document {
  email: string;
  firstname: string;
  lastname: string;
  getFullName: () => string;
  setPassword: (password: string) => void;
  verifyPassword: (password: string) => boolean;
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
  },
  password: {
    type: String,
    required: true,
  }
});

profileSchema.methods.getFullName = function () {
  return `${this.firstname} ${this.lastname}`;
}

profileSchema.methods.setPassword = function (password: string) {
  this.password = SHA256(password).toString();
}

profileSchema.methods.verifyPassword = function (password: string) {
  return this.password === SHA256(password).toString();
}

const Profile = model<IProfile, Model<IProfile>>('profile', profileSchema);

export default Profile;