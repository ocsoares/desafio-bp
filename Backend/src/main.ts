import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./config/app";
import helmet from "helmet";
import { Request, Response } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    app.enableCors({
        allowedHeaders: "Content-Type, Accept",
        origin: [process.env.FRONTEND_URL || "localhost"],
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

    const config = new DocumentBuilder()
        .setTitle("Desafio-BP")
        .setVersion("1.0")
        .addTag("user")
        .addTag("product")
        .addTag("user-product")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("docs", app, document);

    const server = app.getHttpAdapter();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    server.get("/", (_: Request, res: Response) => {
        res.redirect("/docs");
    });

    await app.listen(PORT);
}

bootstrap();
