import z from 'zod';
import { validate } from 'zod-express-validator';
import { ValidationError } from '../../errors';

const signUpValidator = validate(
    {
        body: z.object({
            email: z.string().email({ message: 'Invalid email' }).toLowerCase(),
            password: z
                .string()
                .min(8, {
                    message: 'The password must be at least 8 characters',
                })
                .max(32, {
                    message: 'The password must be at most 32 characters',
                })
                .regex(/[A-Z]/, {
                    message:
                        'The password must contain at least one uppercase character',
                })
                .regex(/[a-z]/, {
                    message:
                        'The password must contain at least one lowercase character',
                })
                .regex(/[0-9]/, {
                    message: 'The password must contain at least one number',
                }),
        }),
    },
    ({ bodyError, paramsError, queryError }, res) => {
        const error = bodyError ?? paramsError ?? queryError;
        if (error) {
            throw new ValidationError(error.errors);
        }
        return res;
    },
);

export default signUpValidator;

export type SignUpMiddleware = typeof signUpValidator;
