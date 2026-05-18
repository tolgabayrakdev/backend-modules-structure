import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './modules/user/user.router.js';
import noteRouter from './modules/note/note.router.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.use(errorHandler);

export default app;
