import { Router } from 'express';

import validator from './signup.validator';

const signUpRouter = Router();

signUpRouter.post('/', validator, (req, res) => {
    res.json({});
});

export default signUpRouter;
