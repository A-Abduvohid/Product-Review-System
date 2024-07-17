import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  await app.listen(PORT);
}
bootstrap();

/*

      "username": "Abduvohid",
      "email": "abduvohidabdurahimov1@gmail.com",
      "password": "123456",
      "role": "admin"
      
*/ 
