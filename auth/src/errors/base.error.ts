import { HttpError } from 'http-errors';
import Status from './status-codes';

export default class BaseError extends Error implements HttpError {
    public readonly status: number;

    constructor(
        message: string,
        public readonly statusCode: Status = Status.InternalServerError,
        public readonly name: string = 'HTTPError',
        public readonly details?: object,
        public expose: boolean = true,
    ) {
        super(message);
        this.status = statusCode;
    }
}
