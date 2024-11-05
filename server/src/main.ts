import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/pipes/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    rawBody:true
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());


  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });



  await app.listen(5000);
}
bootstrap();
