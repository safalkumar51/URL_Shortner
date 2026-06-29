import { generateNanoId } from "../utils/helper.js"
import urlSchema from "../models/short_url.model.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js"
import { redis } from "../config/redis.config.js"
import { encodeBase62 } from "../utils/base62.js"

const RESERVED_PATTERN = /^[0-9A-Za-z]{7}$/;

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUser = async (url,userId,slug=null) => {
    const normalizedSlug = typeof slug === 'string' ? slug.trim() : slug
    let shortUrl;
    let sequence = null;

    if(normalizedSlug){
        const exists = await getCustomShortUrl(normalizedSlug)
        if (exists || RESERVED_PATTERN.test(normalizedSlug)) throw new Error("This custom url already exists")
        shortUrl = normalizedSlug
    }
    else{
        sequence = await redis.incr("url_counter");
        shortUrl = encodeBase62(sequence).padStart(7, "0");
    }

    await saveShortUrl(shortUrl,url,userId,sequence)
    return shortUrl
}