// src/guards/auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import CONFIG from '../../config';

@Injectable()
export class APIKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key']; // Assuming the API key is provided in the 'x-api-key' header
    console.log('ketL', CONFIG.APP.ACCESS_KEY)
    // Implement your API key validation logic here
    const isValidApiKey = apiKey === CONFIG.APP.ACCESS_KEY;

    return isValidApiKey;
  }
}
