import { logger } from '../../utils/logger';
import { Request, Response } from 'express';
import { createUserService } from './user.service';

export async function createUser(req: Request, resp: Response) {
    logger.info('modules / user.controller.ts - createUser receive query: ' + JSON.stringify(req.query));
   
    req.body.role = 'user';
    const res = await createUserService(req.body);
    
    if (res === null) {
        resp.status(400).send();    
    } else {
        resp.status(200).json(res);
    }
    
    logger.info('modules / user.contrller.ts - createUser ended');
}