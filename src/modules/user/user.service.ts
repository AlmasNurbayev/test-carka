import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../../utils/logger";
import { prismaI } from "../../utils/prisma";
import bcrypt from 'bcrypt';

export async function createUserService(body: Prisma.userCreateInput) {
  logger.info('modules/user.service.ts - createUserService start');


  body.role = 'user';
  body.password = bcrypt.hashSync(body.password, 8)

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
  logger.info('modules/user.service.ts - authUserService start ' + JSON.stringify(body));

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

export async function getUsersService(where?: Prisma.userFindManyArgs) {
  logger.info('modules/user.service.ts - getUsersService start ' + JSON.stringify(where));
  console.log('where',where);
  
  try {
    let res = await prismaI.user.findMany(where);
    return res;
  } catch (error) {
    console.log('modules/user.service.js - getUsersService ' + error);
    logger.error('modules/user.service.js - getUsersService ' + error);
    return undefined;
  }  
}

export async function deleteUserService(where: Prisma.userDeleteArgs) {
  logger.info('modules/user.service.ts - deleteUserService start with id ' + JSON.stringify(where));
 
  try {
    let res = await prismaI.user.delete(where);
    return res;
  } catch (error) {
    console.log('modules/user.service.js - deleteUserService ' + error);
    logger.error('modules/user.service.js - deleteUserService ' + error);
    return undefined;
  }  
}