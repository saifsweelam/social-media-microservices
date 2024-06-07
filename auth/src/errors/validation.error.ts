import z from 'zod';
import BaseError from './base.error';
import Status from './status-codes';

export default class ValidationError extends BaseError {
    constructor(errors: z.ZodIssue[]) {
        super('Input Validation Failed', Status.BadRequest, 'BadRequest', {
            errors,
        });
    }
}
