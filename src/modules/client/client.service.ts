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


export async function updateClientService(body: Prisma.clientUpdateInput) {
  logger.info('modules/client.service.ts - updateClientService start ' + JSON.stringify(body));
  
  try {
    let res = await prismaI.client.update(
      { data: body,
        where: {phone: String(body.phone)} }
    );
    return res;
  } catch (error) {
    //let error_res: undefined | null = undefined;
      if (String(error).includes('Record to update not found')) {
          return {error: 'not found client'};  
      }
      console.log('modules/client.service.js - updateClientService ' + error);
      logger.error('modules/client.service.js - updateClientService ' + error);
      return {error: String(error)};
    }
}

export async function deleteClientService(where: {where: {id: number}}): Promise<Prisma.clientUncheckedCreateInput | {error?: string} | undefined> {
  logger.info('modules/client.service.ts - deleteClientService start with id ' + JSON.stringify(where));
 
  try {
    let res = await prismaI.client.delete(where);
    return res;
  } catch (error) {
    console.log('modules/client.service.js - deleteClientService ' + error);
    logger.error('modules/client.service.js - deleteClientService ' + error);

    if (String(error).includes('Record to delete does not exist')) {
      return {error: 'not found client'};  
    }
    return undefined;
  }  
}