import { ERROR_CODE } from './exception.enum';

export const NotFoundException = (message?: string) => {
  return new ServiceException(ERROR_CODE.NOT_FOUND, message);
};

export const BadRequestException = (message?: string) => {
  return new ServiceException(ERROR_CODE.BAD_REQUEST, message);
};

export class ServiceException extends Error {
  errorCode: number;
  constructor(errorCode: number, message?: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
