import { Router } from 'express';

import validator from './signup.validator';
import controller from './signup.controller';

export const SIGN_UP_ROUTE = '/api/auth/signup';

const signUpRouter = Router();

signUpRouter.use((req, res, next) => {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    return next();
});

signUpRouter.post('/', validator, controller);

signUpRouter.all('/', (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
});

export default signUpRouter;
