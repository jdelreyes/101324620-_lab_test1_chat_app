import { Document } from 'mongoose';

export interface IUser extends Document {
  userName: String;
  firstName: String;
  lastName: String;
  password: String;
  email: String;
  createdAt: Date
}
