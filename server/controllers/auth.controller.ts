import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

async function login(request: Request, response: Response) {
  try {
    const access_token = await AuthService.login(
      request.body.userName,
      request.body.password,
    );

    if (!access_token) return response.status(400).send({});

    return response.status(200).json({ access_token });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
  }
}

async function register(request: Request, response: Response) {
  try {
    const newUser = await AuthService.register(
      request.body.userName,
      request.body.firstName,
      request.body.lastName,
      request.body.password,
      request.body.email,
    );

    if (!newUser) return response.status(400).send({});

    return response.status(201).json(newUser);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
  }
}

export const AuthController = { login, register };
