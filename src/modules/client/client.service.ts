import { Prisma } from "@prisma/client";
import { logger } from "../../utils/logger";
import { prismaI } from "../../utils/prisma";

export async function createClientService(body: Prisma.clientCreateInput) {
  logger.info('modules/client.service.ts - createClientService start ' + JSON.stringify(body));


  try {
    let res = await prismaI.client.create(
      { data: body }
    );
    return res;
  } catch (error) {
    if (String(error).includes('Unique constraint failed')) {
      return {error: 'not unique email/phone'}; 
    }
    console.log('modules/client.service.js - createClientService ' + error);
    logger.error('modules/client.service.js - createClientService ' + error);
    return error
  }
}

export async function getClientsService(where?: Prisma.clientFindManyArgs) {
  logger.info('modules/client.service.ts - getClientsService start ' + JSON.stringify(where));
  //console.log('where',where);
  
  try {
    let res = await prismaI.client.findMany(where);
    return res;
  } catch (error) {
    console.log('modules/client.service.js - getClientsService ' + error);
    logger.error('modules/client.service.js - getClientsService ' + error);
    return undefined;
  }  
}
