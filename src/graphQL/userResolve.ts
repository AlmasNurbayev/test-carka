import { authUserService, createUserService } from "../modules/user/user.service";
import { logger } from "../utils/logger";
import { validationResult } from "express-validator";
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

function generateToken(id: number, email: string, role: string) {
    const payload = {id: id, email: email, role: role};
    let secret;
    if (process.env.jwtSecret) {
      secret = process.env.jwtSecret;
    } else {
      secret = String(Date.now()*3);
    }
    return jwt.sign(payload, secret, { expiresIn: '24h'});
}

export async function authResolve(body: {email: string, password: string}) {
  logger.info('graphQL / userResolve.ts - auth receive body: ' + JSON.stringify(body));

  console.log('body', body);
  
  
  const user = await authUserService(body);
  if (!user) {
    logger.error('graphQL / userResolve.ts - not correct');
    return null;    
  }
  const comparePass = bcrypt.compareSync(body.password, user.password); 
  if (!comparePass) {
    logger.error('graphQL / userResolve.ts - not correct');
    return null; 
  }

  const token = generateToken(user.id, user.email, user.role);
  logger.info('graphQL / userResolve.ts - auth success ended');
  return {token};    
   
}