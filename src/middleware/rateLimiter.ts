import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 1, // Per second
});

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown-ip'; // Fallback value if req.ip is undefined

  rateLimiter.consume(ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ error: 'Too Many Requests' });
    });
};
