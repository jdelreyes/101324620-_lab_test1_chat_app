import { Document } from 'mongoose';

export interface UserInterface extends Document {
  userName: String;
  firstName: String;
  lastName: String;
  password: String;
  email: String;
  createdAt: Date;
}
