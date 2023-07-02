import {
  applyDecorators,
  Get as NestGet,
  Post as NestPost,
  Put as NestPut,
  Delete as NestDelete,
  Patch as NestPatch,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestErrorResponseDTO,
  ForbiddenErrorResponseDTO,
  InternalServerErrorResponseDTO,
  NotFoundErrorResponseDTO,
  UnauthorizedErrorResponseDTO,
} from '../exceptions/response';

type RouteDecoratorArgs = {
  path: string;
  model: any;
  description: string;
};

const DEFAULT_ROUTE_DECORATORS = [
  ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestErrorResponseDTO }),
  ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorResponseDTO }),
  ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponseDTO }),
  ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedErrorResponseDTO }),
  ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: InternalServerErrorResponseDTO }),
];

export const Get = ({ path, model, description }: RouteDecoratorArgs) => {
  return applyDecorators(
    ApiOkResponse({
      type: model,
    }),
    ...DEFAULT_ROUTE_DECORATORS,
    ApiOperation({
      summary: description,
    }),
    NestGet(path),
  );
};

export const Patch = ({ path, model, description }: RouteDecoratorArgs) => {
  return applyDecorators(
    ApiOkResponse({
      type: model,
    }),
    ...DEFAULT_ROUTE_DECORATORS,
    ApiOperation({
      summary: description,
    }),
    NestPatch(path),
  );
};

export const Post = ({ path, model, description }: RouteDecoratorArgs) => {
  return applyDecorators(
    ApiOkResponse({
      type: model,
    }),
    ...DEFAULT_ROUTE_DECORATORS,
    ApiOperation({
      summary: description,
    }),
    NestPost(path),
  );
};

export const Put = ({ path, model, description }: RouteDecoratorArgs) => {
  return applyDecorators(
    ApiOkResponse({
      type: model,
    }),
    ...DEFAULT_ROUTE_DECORATORS,
    ApiOperation({
      summary: description,
    }),
    NestPut(path),
  );
};

export const Delete = ({ path, model, description }: RouteDecoratorArgs) => {
  return applyDecorators(
    ApiOkResponse({
      type: model,
    }),
    ...DEFAULT_ROUTE_DECORATORS,
    ApiOperation({
      summary: description,
    }),
    NestDelete(path),
  );
};
