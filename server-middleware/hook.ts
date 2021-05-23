/**
 * Server middleware to modify request & response
 */
import { Request, Response, NextFunction } from 'express'

export default function (_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'sameorigin')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
}
