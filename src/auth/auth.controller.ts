import { authUserService, createUserService } from "../modules/user/user.service";
import { logger } from "../utils/logger";
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function generateToken(id: number, email: string, role: string) {
    const payload = {id: id, email: email, role: role};
    let secret;
    if (process.env.jwtSecret) {
      secret = process.env.jwtSecret;
    } else {
      secret = String(Date.now()*3);
    }

    return jwt.sign(payload, secret, { expiresIn: '24h'});
}


export async function auth(req: Request, resp: Response) {
  logger.info('auth / auth.controller.ts - auth receive body: ' + JSON.stringify(req.body));
  
  const user = await authUserService(req.body);
  if (!user) {
    logger.info('auth / auth.controller.ts - not correct');
    return resp.status(400).json({message: 'incorrect email or password'});    
  }
  const comparePass = bcrypt.compareSync(req.body.password, user.password); 
  if (!comparePass) {
    logger.info('auth / auth.controller.ts - not correct');
    return resp.status(400).json({message: 'incorrect email or password'}); 
       
  }

  const token = generateToken(user.id, user.email, user.role);
  logger.info('auth / auth.controller.ts - auth success ended');
  return resp.status(200).json({token});    
   
}

export async function register(req: Request, resp: Response) {
  logger.info('auth / auth.controller.ts - register receive body: ' + JSON.stringify(req.body));


    const errorsVal = validationResult(req);
    if (!errorsVal.isEmpty()) {
      return resp.status(400).json({message: 'errors at registration', errorsVal});   
    }

    const res = await createUserService(req.body);  
        
    if (res === undefined) {
      logger.error('auth / auth.controller.ts - error');
      resp.status(400).json({message: 'registration error'});    
    } else if (res === null) {
      logger.error('auth / auth.controller.ts - new user cannot be created with this email');
      resp.status(400).json({message: 'new user cannot be created with this email'}); 
    } else {
      logger.info('auth / auth.controller.ts - register ended');
      resp.status(200).json({message: 'user ' + req.body.email + ' successfully created'});
    }    
}

