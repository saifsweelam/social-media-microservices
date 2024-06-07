import { ErrorRequestHandler } from 'express';
import { BaseError, InternalServerError } from '../errors';

const errorMiddleware: ErrorRequestHandler = (err: BaseError, req, res) => {
    const error =
        err instanceof BaseError && err.expose
            ? err
            : new InternalServerError();

    res.status(error.status).json({
        name: error.name,
        statusCode: error.statusCode,
        message: error.message,
        ...error.details,
    });
};

export default errorMiddleware;
