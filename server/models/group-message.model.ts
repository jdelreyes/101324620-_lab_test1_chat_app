import { model, Schema } from 'mongoose';
import { GroupMessageInterface } from '../interface/group-message.interface';

const groupMessageSchema: Schema<GroupMessageInterface> = new Schema({
  from_user: {
    type: String,
  },
  room: {
    type: String,
  },
  message: {
    type: String,
  },
  data_sent: {
    type: Date,
    default: Date.now(),
  },
});
