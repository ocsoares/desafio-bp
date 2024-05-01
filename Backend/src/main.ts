import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./config/app";
import helmet from "helmet";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    app.enableCors({
        allowedHeaders: "Content-Type, Accept",
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST"],
        credentials: true,
    });

    app.setGlobalPrefix("api");

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(PORT);
}

bootstrap();
