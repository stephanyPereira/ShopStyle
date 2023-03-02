import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MS CUSTOMER API')
    .setDescription('The MS CUSTOMER API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.APP_PORT || 3333;
  await app.listen(port, () => console.log(`Server running on port: ${port}`));
}
bootstrap();
