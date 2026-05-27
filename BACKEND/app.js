import express from "express";
import dotenv from "dotenv"
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

dotenv.config()

const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'APP_URL']
const missing = requiredEnv.filter((k) => !process.env[k])
if (missing.length > 0) {
    console.error('Missing required env vars:', missing.join(', '))
    process.exit(1)
}

const app = express();

const port = process.env.PORT || 3000;



app.use(express.json({ limit: '10kb' }));


app.use(cors({
    origin: [
        "https://url-shortner-d4xd7rqm9-safalkumar51s-projects.vercel.app/"
    ],
    credentials: true
}));

// Security middleware

// Body size limits

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(apiLimiter)
app.use(cookieParser())

//app.use(attachUser)

app.use("/api/user", user_routes)
const authLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 })
app.use("/api/auth", authLimiter, auth_routes)
app.use("/api/create", short_url)
app.get("/:id", redirectFromShortUrl)
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))

app.use(errorHandler)

app.listen(port, '0.0.0.0', async () => {
    await connectDB()
    console.log("Server listening at port number: " + port);
})


