import { auth } from '@social-media/auth';
import type { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include user and session
declare global {
  namespace Express {
    interface Request {
      user?: any;
      session?: any;
    }
  }
}

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Better‑auth automatically reads the session cookie / header.
      // The `auth.api.getSession` expects a request object with headers.
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      console.log(session)
      if (!session) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      // Attach user info to the request for later use in controllers
      req.user = session.user;
      req.session = session.session;
      next();
    } catch (error) {
      next(error);
    }
  };
};