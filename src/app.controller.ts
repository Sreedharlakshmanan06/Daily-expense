import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Defines the AppController class as a controller for handling HTTP requests
@Controller()
export class AppController {
  // Injects the AppService to use its methods within the controller
  constructor(private readonly appService: AppService) {}

  // Handles GET requests to the root route ('/')
  @Get()
  getHello(): string {
    // Calls the getHello method from the AppService to get a response
    return this.appService.getHello();
  }
}
