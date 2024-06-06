import { Router } from 'express';

import validator from './signup.validator';

export const SIGN_UP_ROUTE = '/api/auth/signup';

const signUpRouter = Router();

signUpRouter.post('/', validator, (req, res) => {
    res.json({});
});

signUpRouter.all('/', (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
});

export default signUpRouter;
