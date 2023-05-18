import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../../utils/logger";
import { prismaI } from "../../utils/prisma";
import { userT } from "./types";

export async function createUserService(body: Prisma.userCreateInput) {
  logger.info('modules/user.service.ts - createUserService start');

  try {
      let res = await prismaI.user.create(
        {data: body}
        );
      return res;
  } catch (error) {
      console.log('modules/user.service.js - createUserService ' + error);
      logger.error('modules/user.service.js - createUserService ' + error);
  }
}