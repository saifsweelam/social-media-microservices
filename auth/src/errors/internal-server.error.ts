import BaseError from './base.error';
import Status from './status-codes';

export default class InternalServerError extends BaseError {
    constructor() {
        super(
            'Internal Server Error',
            Status.InternalServerError,
            'InternalServerError',
        );
    }
}
