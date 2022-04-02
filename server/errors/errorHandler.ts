import type { Request, Response, NextFunction } from 'express'

import type { RestApiError } from "../ts/types"

export const errorLogger = (err: RestApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  return next(err)
}

export const errorResponder = (err: RestApiError, req: Request, res: Response) => {
  const statusCode = err.statusCode ?? 400

  return res.status(statusCode).json({ message: err.message })
}
