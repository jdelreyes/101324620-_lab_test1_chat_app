import { Document } from 'mongoose';

export interface UserInterface extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: Date;
}
