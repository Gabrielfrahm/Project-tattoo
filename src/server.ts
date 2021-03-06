import 'reflect-metadata';
import './database';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import uploadConfig from './config/uploads';
import AppError from './error/AppError';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('dale');
});
