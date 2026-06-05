import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', err.message);
  
  res.status(500).json({
    error: {
      message: err.message || 'Error interno',
      timestamp: new Date().toISOString(),
    },
  });
}