import z from 'zod';
import { validate } from 'zod-express-validator';

const signUpValidator = validate(
    {
        body: z.object({
            email: z.string().email(),
        }),
    },
    ({ bodyError, paramsError, queryError }, res) => {
        const error = bodyError ?? paramsError ?? queryError;
        return res.status(400).json({ error: error?.message });
    },
);

export default signUpValidator;

export type SignUpMiddleware = typeof signUpValidator;
