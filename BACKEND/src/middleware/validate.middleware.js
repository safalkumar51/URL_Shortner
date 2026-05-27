import { ZodError } from 'zod'

export const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body)
    return next()
  } catch (err) {
    if (err instanceof ZodError) {
      const firstMessage = err.errors[0]?.message ?? 'Validation error'
      return res.status(400).json({
        message: firstMessage,
        errors: err.errors,
      })
    }
    return next(err)
  }
}
