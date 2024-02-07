import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const AuthRoute: Router = Router();

AuthRoute.post('/login', AuthController.login);

AuthRoute.post('/register', AuthController.register);

export default AuthRoute;