import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/api-key-auth';

// Defines the AppModule class as a module in NestJS
@Module({
  // Specifies the modules to be imported
  imports: [
    // Configures the MongooseModule to connect to a MongoDB database
    MongooseModule.forRoot('mongodb+srv://sully6458:PLaFCPjKkKC8hu6a@cluster0.b65i5cz.mongodb.net/test?retryWrites=true&w=majority'),
    // Imports the UserModule
    UserModule,
    // Imports the ExpenseModule
    ExpenseModule
  ],
  // Specifies the controllers to be used in this module
  controllers: [AppController],
  // Specifies the providers (services and guards) to be used in this module
  providers: [
    // Registers the ApiKeyGuard as a global guard
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    // Registers the AppService as a provider
    AppService
  ],
})
// Exports the AppModule class
export class AppModule {}
