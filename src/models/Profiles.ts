import { Document, Schema, model, Model} from 'mongoose';

export interface IProfile extends Document {
  email: String;
  firstname: String;
  lastname: String;
  myCustomFunction: () => String;
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

profileSchema.methods.getFullName = function () {
  return `${this.firstname} ${this.lastname}`;
}

export const Profile = model<IProfile, Model<IProfile>>('profile', profileSchema);