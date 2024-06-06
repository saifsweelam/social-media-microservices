import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(express.json());
app.use(
    cors({
        preflightContinue: true,
    }),
);

app.use('/api/auth', router);

export default app;
