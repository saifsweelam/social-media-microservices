import { Router } from 'express';
import signUpRouter from './signup/signup.route';

const router = Router();

router.use('/signup', signUpRouter);

export default router;
