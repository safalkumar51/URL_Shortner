import { redis } from "../config/redis.config.js";
import urlSchema from "../models/short_url.model.js";
export const initializeCounter = async () => {

    const exists = await redis.exists("url_counter");

    if (exists) return;

    const latest = await urlSchema.findOne()
        .sort({ sequence: -1 })
        .select("sequence");

    const lastSequence = latest?.sequence || 0;

    await redis.set("url_counter", lastSequence);

    console.log("Counter initialized:", lastSequence);

}