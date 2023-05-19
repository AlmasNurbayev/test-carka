import { Router } from 'express';
import swaggerUi from 'swagger-ui-express'
import { swaggerSchema } from '../swagger/schema_swagger'
import { getUsers } from '../modules/user/user.controller';
import { auth, register } from '../auth/auth.controller';
import { check } from 'express-validator';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
import { createHandler } from 'graphql-http/lib/use/express';
import { rootSchema  }  from '../graphQL/userSchema';

export function initRouterApi() {
  const router = Router();
  router.post('/auth',
    [check('email', 'email must be not empty').notEmpty(),
      check('password', 'password must be not empty').notEmpty()]
    , auth);
  router.post('/register', 
  [check('email', 'email must be not empty').notEmpty(),
    check('password', 'Password must be longer 6 symbols ').isLength({ min: 6 })]
    , register);

  router.get('/user', [checkRole] ,getUsers);
  router.all('/graphql', checkAuth , createHandler({ schema: rootSchema }));
  
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerSchema.schema));
  

  return router;
}