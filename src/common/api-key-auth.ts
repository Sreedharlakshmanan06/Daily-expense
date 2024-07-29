import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

// Marks the class as an injectable guard for dependency injection
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // Determines whether the current request should be allowed to proceed
  canActivate(context: ExecutionContext): boolean {
    // Extracts the HTTP request from the execution context
    const request: Request = context.switchToHttp().getRequest();
    
    // Logs the request headers for debugging purposes
    console.log(request.headers);
    
    // Extracts the API key from the request headers
    const apiKey = request.headers['x-api-key'];

    // Checks if the API key is missing and throws an unauthorized exception if so
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    // Validates the API key
    const validApiKey = this.validateApiKey(apiKey as string);
    
    // Checks if the API key is invalid and throws an unauthorized exception if so
    if (!validApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    // Returns true to allow the request to proceed
    return true;
  }

  // Validates the provided API key against a list of valid API keys
  validateApiKey(apiKey: string): boolean {
    // Defines a list of valid API keys
    const validApiKeys = ['1234', '4321'];
    
    // Checks if the provided API key is in the list of valid API keys
    return validApiKeys.includes(apiKey);
  }
}
