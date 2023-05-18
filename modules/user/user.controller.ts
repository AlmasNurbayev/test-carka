import { logger } from '../../utils/logger';
import { createUserService } from './user.service';

export async function createUser(request, responce) {
    logger.info('server / user.controller.ts - createUser receive query: ' + JSON.stringify(request.query));


    const res = await createUserService();
    
    if (res === null) {
        responce.status(400).send();    
    } else {
        responce.status(200).json(res);
    }

    
    logger.info('server / user.contrller.ts - createUser ended');
}