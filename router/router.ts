import { Router } from 'express';
import swaggerUi from 'swagger-ui-express'
import { swaggerSchema } from '../swagger/schema_swagger'
import { createUser } from '../modules/user/user.controller';

export function initRouterApi() {
  const router = Router();
  router.get('/user', createUser); 


}