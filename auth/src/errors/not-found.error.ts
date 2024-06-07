import BaseError from './base.error';
import Status from './status-codes';

export default class NotFoundError extends BaseError {
    constructor() {
        super('Resource not found', Status.NotFound, 'NotFound');
    }
}
