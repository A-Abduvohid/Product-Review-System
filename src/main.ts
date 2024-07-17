import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(PORT);
}
bootstrap();

/*

      "username": "Abduvohid",
      "email": "abduvohidabdurahimov1@gmail.com",
      "password": "123456",
      "role": "admin"

      "username": "Abdujabbor",
      "email": "abdujoborzorbola@gmail.com",
      "password": "123456",
      "role": "user"
      
*/ 
