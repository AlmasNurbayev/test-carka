import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../../utils/logger";
import { prismaI } from "../../utils/prisma";
import bcrypt from 'bcrypt';
import { userT } from "./types";

export async function createUserService(body: Prisma.userCreateInput) {
  logger.info('modules/user.service.ts - createUserService start ' + JSON.stringify(body));


  body.role = 'user';
  body.password = bcrypt.hashSync(body.password, 8)

  try {
    let res = await prismaI.user.create(
      { data: body }
    );
    return res;
  } catch (error) {
    if (String(error).includes('Unique constraint failed')) {
      return {error: 'not unique email'}; 
    }
    console.log('modules/user.service.js - createUserService ' + error);
    logger.error('modules/user.service.js - createUserService ' + error);
    return error
  }
}

export async function updateUserService(body: Prisma.userUpdateInput) {
  logger.info('modules/user.service.ts - updateUserService start ' + JSON.stringify(body));

  if (body.password) {
    body.password = bcrypt.hashSync(String(body.password), 8)
  }
 
  //console.log('updatebody', body);
  
  try {
    let res = await prismaI.user.update(
      { data: body,
        where: {email: String(body.email)} }
    );
    return res;
  } catch (error) {
    //let error_res: undefined | null = undefined;
      if (String(error).includes('Record to update not found')) {
          return {error: 'not found user'};  
      }
      console.log('modules/user.service.js - updateUserService ' + error);
      logger.error('modules/user.service.js - updateUserService ' + error);
      return {error: String(error)};
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
    console.log('modules/user.service.js - authUserService ' + error);
    logger.error('modules/user.service.js - authUserService ' + error);
  }  
}

export async function getUsersService(where?: Prisma.userFindManyArgs) {
  logger.info('modules/user.service.ts - getUsersService start ' + JSON.stringify(where));
  //console.log('where',where);
  
  try {
    let res = await prismaI.user.findMany(where);
    return res;
  } catch (error) {
    console.log('modules/user.service.js - getUsersService ' + error);
    logger.error('modules/user.service.js - getUsersService ' + error);
    return undefined;
  }  
}

export async function deleteUserService(where: Prisma.userDeleteArgs): Promise<Prisma.userUncheckedCreateInput | {error?: string} | undefined> {
  logger.info('modules/user.service.ts - deleteUserService start with id ' + JSON.stringify(where));
 
  try {
    let res = await prismaI.user.delete(where);
    return res;
  } catch (error) {
    console.log('modules/user.service.js - deleteUserService ' + error);
    logger.error('modules/user.service.js - deleteUserService ' + error);

    if (String(error).includes('Record to delete does not exist')) {
      return {error: 'not found user'};  
    }
    return undefined;
  }  
}