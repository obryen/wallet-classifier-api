import { applyDecorators, Controller as NestController, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

type ControllerArgs = {
  group: string;
  path?: string;
  version?: '1' | '2';
};

export const Controller = ({ group, path, version = '1' }: ControllerArgs) => {
  return applyDecorators(
    ApiTags(group),
    NestController({
      path,
      version,
    }),
  );
};
