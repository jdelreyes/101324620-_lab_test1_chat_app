import { UserInterface } from '../interface/user.interface';
import UserModel from '../models/user.model';
import * as argon from 'argon2';

async function register(
  userName: string,
  firstName: string,
  lastName: string,
  password: string,
  email: string,
) {
  try {
    const newUser: UserInterface = new UserModel({
      userName,
      firstName,
      lastName,
      password,
      email,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('[ERROR]:', error);
    return null;
  }
}

async function login(userName: string, password: string) {
  try {
    const user = await UserModel.findOne({ userName });
    if (!user) return null;

    const passwordMatches = await argon.verify(
      password,
      user.password.toString(),
    );
    if (!passwordMatches) return null

  } catch (error) {
    console.error(error);
    return null;
  }
}
