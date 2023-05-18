import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUserRole extends Request {
  user?: any, 
}

export function checkRole(req: RequestWithUserRole, resp: Response, next: NextFunction) {
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
    const role = req.user.role;
    if (!role) {
      return resp.status(403).json({message: 'not authorized user'})
    }
    if (role !== 'admin') {
      return resp.status(403).json({message: 'not match role'})
    }
    next();

  } catch (error) {
    return resp.status(403).json({message: 'not authorized user'})
  }


}