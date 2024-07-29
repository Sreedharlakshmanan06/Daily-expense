import { Injectable } from '@nestjs/common';

// Marks the AppService class as a provider that can be injected into other components
@Injectable()
export class AppService {
  // Method to return a simple greeting message
  getHello(): string {
    return 'Hello World!';
  }
}
