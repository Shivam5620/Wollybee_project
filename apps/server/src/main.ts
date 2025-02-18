import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Environment } from '@repo/ui/enums/environment';
import { TypeOrmExceptionFilter } from './database/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  if (
    [Environment.Local, Environment.Development].includes(
      configService.get('NODE_ENV'),
    )
  ) {
    app.enableCors({
      origin: '*', // or specify your allowed origins here
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  const env = configService.get('NODE_ENV');

  if (env === Environment.Local || env == Environment.Development) {
    const config = new DocumentBuilder()
      .setTitle('Wollybee APIs')
      .setDescription('Wollybee APIs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  if ([Environment.Local, Environment.Development].includes(env)) {
    app.enableCors();
  }

  // Handle TypeORM errors
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  await app.listen(configService.get<number>('PORT', { infer: true }));
}

bootstrap();
