import { createClient } from "redis";

export const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379
    }
});

redis.on("error", err => {
    console.error("Redis Error:", err);
});

redis.on("connect", () => {
    console.log("Redis Connected");
});