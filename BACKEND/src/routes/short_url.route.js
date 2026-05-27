import express from 'express';
import { createShortUrl } from '../controller/short_url.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validate.middleware.js'
import { createUrlSchema } from '../validators/short_url.validator.js'

const router = express.Router();

router.post("/", authMiddleware, validateBody(createUrlSchema), createShortUrl);

export default router;