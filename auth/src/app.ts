import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(
    cors({
        preflightContinue: true,
    }),
);

app.use('/api/auth', router);

app.use(errorMiddleware);

export default app;
