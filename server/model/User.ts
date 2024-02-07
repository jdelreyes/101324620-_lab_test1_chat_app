import { model, Schema } from 'mongoose';
import { IUser } from '../interface/IUser';
import * as argon from 'argon2';

const userSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (this: IUser, next): Promise<void> {
  if (!this.isModified('password')) return next();

  try {
    this.password = await argon.hash(this.password.toString());
    next();
  } catch (error) {
    console.error(`[ERROR] ${error}`);
    return next(error);
  }
});

userSchema.pre(
  'findOneAndUpdate',
  async function (this: { _update: IUser }, next): Promise<void> {
    if (!this._update || !this._update.password) return next();

    try {
      this._update.password = await argon.hash(
        this._update.password.toString(),
      );
      next();
    } catch (error) {
      console.error(`[ERROR] ${error}`);
      return next(error);
    }
  },
);

const User = model<IUser>('User', userSchema);

export default User;
