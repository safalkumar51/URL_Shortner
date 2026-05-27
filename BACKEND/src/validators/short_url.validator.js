import { z } from 'zod'

export const createUrlSchema = z.object({
  url: z.string().url('Invalid URL'),
  slug: z.preprocess(
    (val) => {
      if (typeof val !== 'string') return val
      const trimmed = val.trim()
      return trimmed.length === 0 ? undefined : trimmed
    },
    z.string().regex(/^[A-Za-z0-9_-]{3,30}$/, 'Slug must be 3-30 chars, alphanumeric, -, _').optional()
  ),
})
