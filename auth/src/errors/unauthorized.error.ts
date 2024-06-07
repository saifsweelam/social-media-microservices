import BaseError from './base.error';
import Status from './status-codes';

export default class UnauthorizedError extends BaseError {
    constructor() {
        super('Unauthorized', Status.Unauthorized, 'Unauthorized');
    }
}
