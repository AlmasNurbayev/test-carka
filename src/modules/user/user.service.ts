import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../../utils/logger";
import { prismaI } from "../../utils/prisma";
import { userT } from "./types";

export async function createUserService(body: Prisma.userCreateInput) {
  logger.info('modules/user.service.ts - createUserService start');

  try {
    let res = await prismaI.user.create(
      { data: body }
    );
    return res;
  } catch (error) {
    let error_res: undefined | null = undefined;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        error_res = null
      }
    }
    console.log('modules/user.service.js - createUserService ' + error);
    logger.error('modules/user.service.js - createUserService ' + error);
    return error_res
  }
}

export async function authUserService(body: Prisma.userWhereUniqueInput) {
  logger.info('modules/user.service.ts - authUserService start');

  try {
    let res = await prismaI.user.findUnique(
      { where: {email: body.email} }
    );
    return res;
  } catch (error) {
    console.log('modules/user.service.js - createUserService ' + error);
    logger.error('modules/user.service.js - createUserService ' + error);
  }  
}

export async function getUsersService(where?: any) {
  logger.info('modules/user.service.ts - getUsersService start ' + JSON.stringify(where));
  console.log('where',where);
  
  try {
    let res = await prismaI.user.findMany({where: where});
    return res;
  } catch (error) {
    console.log('modules/user.service.js - getUsersService ' + error);
    logger.error('modules/user.service.js - getUsersService ' + error);
    return undefined;
  }  
}