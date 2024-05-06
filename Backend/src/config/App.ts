export class App {
    static host(): string {
        return process.env.HOST ?? "localhost";
    }

    static port(): number {
        return process.env.PORT ? Number(process.env.PORT) : 5000;
    }

    static env(): string {
        return process.env.ENV ?? "development";
    }
}
