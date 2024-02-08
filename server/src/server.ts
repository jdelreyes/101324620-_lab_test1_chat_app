import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config();

const application: Application = express();
const SERVER_PORT: number = Number(process.env.PORT) || 8000;
const express_server = application.listen(SERVER_PORT, (): void => {
  console.log(`[LOG] Server is running at port ${SERVER_PORT}`);
});

const io = new Server(express_server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// middleware
application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(cors());

// routes
import AuthRoute from '../routes/auth.route';
application.use('/api/auth', AuthRoute);

// db
const uri: string = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_NAME}:27017/`;

mongoose
  .connect(uri)
  .then(async (): Promise<void> => {
    console.log('[LOG] Connected to MongoDB');
  })
  .catch((err): void => {
    console.error('[ERROR] Failed to connect to MongoDB', err);
    process.exit();
  });

application.get('/', (request: Request, response: Response): Response => {
  return response.status(200).send({});
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
