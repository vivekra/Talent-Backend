import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/environment";
import logger from "../config/logger";
import ApiError from "../utils/ApiError";

export class ErrorHandle {
  static errorConverter(err: any, request: Request, response: Response, next: NextFunction) {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
  }

  // eslint-disable-next-line no-unused-vars
  static errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let { statusCode, message } = err;
    if (env.NODE_ENV === "production" && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
      code: statusCode,
      message,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    };

    if (env.NODE_ENV === "development") {
      logger.error(err);
    }
    res.status(statusCode).send(response);
  }
  static writeLog(message: String, ex: String) {
    if (typeof ex === "string") {
      message += ` ${ex.toUpperCase()}`;
    } else if (ex instanceof Error) {
      message += ` ${ex.message}`;
    }
    console.log(message);
  }
  static errorMes(message: String, ex: String) {
    if (typeof ex === "string") {
      message += ` ${ex.toUpperCase()}`;
    } else if (ex instanceof Error) {
      message += ` ${ex.message}`;
    }
    return message;
  }
}
