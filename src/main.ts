import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './common/api-key-auth';

// Defines an async function to bootstrap the application
async function bootstrap() {
  // Creates an instance of the NestJS application using the AppModule
  const app = await NestFactory.create(AppModule);
  // Starts the application and listens for incoming HTTP requests on port 3000
  await app.listen(3000);
}
// Calls the bootstrap function to start the application
bootstrap();
