import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { acl } from './accessRoles';
import { logger } from '../utils/logger';


interface RequestWithUserRole extends Request {
  user?: any,
}

export function checkAuth(req: RequestWithUserRole, resp: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  // проверка запроса на разрешение any в ACL листе - не требуется токен
  const arr1 = req.body.query.split(/[{(]/);
  if (arr1.length < 2) {
    return resp.status(403).json({ message: 'not correct query - missing query/mutation' })
  } else {
    const typeQuery = arr1[0].replaceAll(/[\W_]+/g, "").toLowerCase();
    const nameQuery = arr1[1].replaceAll(/[\W_]+/g, "").toLowerCase();
    console.log(typeQuery, nameQuery);

    const res1 = acl.filter((el) => {
      let roleFind = el.role.includes('any');
      if (el.type.toLowerCase() === typeQuery && el.name.toLowerCase() === nameQuery && roleFind === true) {
        console.log('return next', el.type, el.name);
        return true;
        //return true;
      } return false;
    })
    if (res1.length > 0) {
      return next();
    }
  }

  // проверка прав если нужна авторизация
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return resp.status(403).json({ message: 'not authorized user' })
    }
    const secret = process.env.jwtSecret;
    if (!secret) {
      return resp.status(403).json({ message: 'jwt decode error' })
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    const role = req.user.role;
    if (!role) {
      return resp.status(403).json({ message: 'not authorized user' })
    }

    // check query for access in ACL
    const arr = req.body.query.split(/[{(]/);
    if (arr.length < 2) {
      return resp.status(403).json({ message: 'not correct query - missing query/mutation' })
    } else {
      const typeQuery = arr[0].replaceAll(/[\W_]+/g, "").toLowerCase();
      const nameQuery = arr[1].replaceAll(/[\W_]+/g, "").toLowerCase();

      const res = acl.filter((el) => {
        let roleFind = el.role.includes(role);
        if (el.type.toLowerCase() === typeQuery && el.name.toLowerCase() === nameQuery && roleFind === true) {
          return true;
        };
        return false;
      })
      console.log(res);
      if (res.length === 0) {
        logger.error('denied email:' + req.user + ' role: ' + role + ' type: ' + typeQuery + ' query: ' + nameQuery);
        return resp.status(403).json({ message: 'access denied' })
      }
    }
    next();

  } catch (error) {
    console.log(error);
    logger.error('checkAuth - try error ' + error);
    return resp.status(403).json({ message: 'authorization check error' })
  }

}