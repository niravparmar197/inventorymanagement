import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache();

export const cachingMiddleware = (req: any, res: any, next: NextFunction) => {
  const cacheKey = req.originalUrl;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    res.json(cachedData);
  } else {
    res.sendResponse = res.send;
    res.send = (body: any) => {
      cache.set(cacheKey, body, 60 * 60); // Cache for 1 hour (adjust the time as needed)
      res.sendResponse(body);
    };
    next();
  }
};
