export class RedisConfig {
    static TTL(): number {
        const oneMinute = 10 * 60 * 1000;

        return process.env.REDIS_TTL
            ? Number(process.env.REDIS_TTL)
            : oneMinute;
    }

    static url(): string {
        const defaultURL = "redis://localhost:6379";

        return process.env.REDIS_URL ?? defaultURL;
    }
}
