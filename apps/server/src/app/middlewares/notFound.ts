import type { NextFunction, Request, Response } from 'express'


const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: 'API Not Found!',
    error: {
      path: req.originalUrl,
      message: 'Your requested API not found',
      method: req.method
    }
  })
}

export default notFound