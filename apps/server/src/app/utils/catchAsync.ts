import type { NextFunction, RequestHandler ,Request, Response} from "express"

 const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: unknown) => {
      // Log the error for debugging (optional)
      console.error('Async error caught by catchAsync:', error)
      next(error)
    })
  }
}

export default catchAsync    