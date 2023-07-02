import { HttpException, HttpStatus } from '@nestjs/common';

export const DEFAULT_ERROR_MESSAGES = {
  [HttpStatus.FORBIDDEN]: 'Access not allowed',
  [HttpStatus.BAD_REQUEST]: 'Invalid input',
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatus.NOT_FOUND]: 'Resource not found',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Something went wrong',
};

export class ForbiddenException extends HttpException {
  constructor(msg?: string) {
    super(msg || DEFAULT_ERROR_MESSAGES[HttpStatus.FORBIDDEN], HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(msg?: string) {
    super(msg || DEFAULT_ERROR_MESSAGES[HttpStatus.NOT_FOUND], HttpStatus.NOT_FOUND);
  }
}

export class BadRequestException extends HttpException {
  constructor(msg?: string, data?: Record<string, string>) {
    super(
      msg || DEFAULT_ERROR_MESSAGES[HttpStatus.BAD_REQUEST],
      HttpStatus.BAD_REQUEST,
      data ? { description: JSON.stringify(data) } : null,
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(msg?: string) {
    super(msg || DEFAULT_ERROR_MESSAGES[HttpStatus.UNAUTHORIZED], HttpStatus.UNAUTHORIZED);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(msg?: string) {
    super(
      msg || DEFAULT_ERROR_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR],
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
