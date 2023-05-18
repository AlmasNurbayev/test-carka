import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface RequestWithUserRole extends Request {
  user?: any, 
}

export function checkAuth(req: RequestWithUserRole, resp: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return resp.status(403).json({message: 'not authorized user'})
    }
    const secret = process.env.jwtSecret;
    if (!secret) {
      return resp.status(403).json({message: 'jwt decode error'})
    }      
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
    

  } catch (error) {
    return resp.status(403).json({message: 'not authorized user'})
  }


}