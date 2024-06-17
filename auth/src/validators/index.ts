import z from 'zod';

export const validateEmail = (email: string) => {
    try {
        const emailSchema = z
            .string()
            .email()
            .refine((value) => value === value.toLowerCase());
        emailSchema.parse(email);
        return true;
    } catch (error) {
        return false;
    }
};

export const validatePassword = (password: string) => {
    try {
        const passwordSchema = z
            .string()
            .min(8)
            .max(32)
            .regex(/[A-Z]/)
            .regex(/[a-z]/)
            .regex(/[0-9]/);
        passwordSchema.parse(password);
        return true;
    } catch (error) {
        return false;
    }
};
