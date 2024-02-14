import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
    const PORT = process.env.APP_PORT || 8000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Интернет магазин Vegist')
        .setDescription('Докумениация REST API')
        .setVersion('1.0.0')
        .addTag('Golley')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/docs', app, document)

    await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

bootstrap();

