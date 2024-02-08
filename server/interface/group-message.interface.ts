import { Document } from 'mongoose';

export interface GroupMessageInterface extends Document {
  from_user: string;
  room: string;
  message: string;
  data_sent: Date;
}
