import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_ERROR_MESSAGES } from '.';

export class BadRequestErrorResponseDTO {
  @ApiProperty({ example: DEFAULT_ERROR_MESSAGES[HttpStatus.BAD_REQUEST] })
  message: string;

  @ApiProperty()
  error: Record<string, string>;
}

export class NotFoundErrorResponseDTO {
  @ApiProperty({ example: DEFAULT_ERROR_MESSAGES[HttpStatus.NOT_FOUND] })
  message: string;
}

export class UnauthorizedErrorResponseDTO {
  @ApiProperty({ example: DEFAULT_ERROR_MESSAGES[HttpStatus.UNAUTHORIZED] })
  message: string;
}

export class ForbiddenErrorResponseDTO {
  @ApiProperty({ example: DEFAULT_ERROR_MESSAGES[HttpStatus.FORBIDDEN] })
  message: string;
}

export class InternalServerErrorResponseDTO {
  @ApiProperty({ example: DEFAULT_ERROR_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR] })
  message: string;
}
