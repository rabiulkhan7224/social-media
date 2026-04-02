
import type { NextFunction, Request, Response } from 'express'
import handleZodValidationError from '../errors/handleZodValidationError'
import AppError from '../errors/AppError'
import type { TErrorSource, TGenericErrorResponse } from '../interfaces/errors'
import { env } from '@social-media/env/server'
import { ZodError } from 'zod/v3'


/**
 * Global error handler middleware for MongoDB with Mongoose
 * Handles all types of errors and returns consistent error responses
 */
const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Initialize default error details
  let statusCode: number = 500
  let message: string = 'Something went wrong'
  let errorSources: TErrorSource[] = [
    {
      path: '',
      message: 'Something went wrong'
    }
  ]

  // Zod validation error handling
  if (err instanceof ZodError) {
    const simplifiedError: TGenericErrorResponse = handleZodValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }
 
 
 
  // Custom AppError handling
  else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    errorSources = [
      {
        path: err.path || '',
        message: err.message
      }
    ]
  }
  // Built-in error handling
  else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err.message
      }
    ]
  }

 

  // Send error response
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
    error: errorSources,
    stack: env.NODE_ENV === 'development' ? err.stack : null
  })
}

export default globalErrorHandler