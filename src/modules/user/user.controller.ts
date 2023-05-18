import { logger } from '../../utils/logger';
import { Request, Response } from 'express';
import { getUsersService } from './user.service';

export async function createUser(req: Request, resp: Response) {
}

export async function getUsers(req: Request, resp: Response) {
    logger.info('modules / user.controller.ts - getUsers receive query: ' + JSON.stringify(req.query));
   
    const res = await getUsersService();  
 
    if (res) {
        logger.info('modules / user.controller.ts - getUsers success ended');
        return resp.status(200).json(res);
    } else {
        logger.error('modules / user.controller.ts - getUsers error ended');
      return resp.status(400).json({message: 'error'});    
    }      

}