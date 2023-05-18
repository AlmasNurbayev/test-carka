import { Router } from 'express';

import swaggerUi from 'swagger-ui-express'
import { swaggerSchema } from '../swagger/schema_swagger'
import { createUser } from '../modules/user/user.controller';

export function initRouterApi() {
  const router = Router();
  router.post('/user', createUser); 
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerSchema.schema));


  return router; 
}