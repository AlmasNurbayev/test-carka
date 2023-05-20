# test-carka
Тестовое задание для graphQL в связке с Express (но лучше бы Nest).
Исходное задание: [https://github.com/LuciusFaraday/tsarka-node-task]

## restAPI:
 - 3 restAPI ендпойнта (POST /api/auth, POST api/register, GET api/user)
 - авторизация возвращает JWT на 24 часа
 - возвращаются осмысленные коды ошибок (400, 403) и сообщения 

## GraphQL:
 - ендпойнт - POST /api/graphqL. Реализованы пока только 1 модуль User и 2-й модуль Client частично
 - Query - 2 запроса 'users' и 'clients'. Например:
 ```
 query { users  {
    id 
    email
    create_date
    password
    role
    name
  } 
}
``` 
 - Mutations - запросы auth, userCreate, userDelete, userUpdate (список обновляется). Например:
```
 mutation { userCreate 
        (email: "test3",
        password: "123456") 
        { id, email, password }
 }
```

- авторизация возвращает JWT на 24 часа
- по умолчанию новые пользователи имеют роль user. 
- доступность запросов для разных ролей регулируется в модуле src/middleware/accessRoles.ts. Для этого в middleware проверяются 2 первых слова из запроса и проверяется на сопоставление с ACL-объектом
```
export const acl: aclT  = [
  // user
  {type: 'query',     name: 'users',        role: ['user', 'admin'] },
  {type: 'mutation',  name: 'userCreate',   role: ['user', 'admin'] },  
  {type: 'mutation',  name: 'userDelete',   role: ['admin']         },  
  {type: 'mutation',  name: 'userUpdate',   role: ['user','admin']  },  
  {type: 'mutation',  name: 'auth',         role: ['user','admin']  },  
  // client
  {type: 'mutation',  name: 'clientCreate', role: ['user', 'admin'] },  
  {type: 'query',     name: 'clients',      role: ['user', 'admin'] },
]
```
Кстати объект удобен для просмотра всех запросов.
- в некоторых случаях (но не во всех) в ответе возвращаются осмысленные ошибки с кодом 200  
            
## Используемый стек:
 - node.js с модулями - express, graphql, graphql-http,  pino (логи)
 - база данных - ORM Prisma подключенная к Postgres
 - размещение - будет размещено на VPS-сервере http://45.146.167.130:3003/api/graphQL
   
## Postman:
 - в корне репозитория размещена коллекция запросов: test-carka.postman_collection.json 

## Тесты:
Используется Jest и Supertest
 - 1 unit-тест - test/userResolve.test.ts - для проверки 2-х функций. В целом для unit-тестов тут не так много простора, только для резолверов.
 - 1 end2end-тест - test/graphQL.user.e2e.test.ts - для авторизации через обычный REST, и 1 запроса graphQL. Их по аналогии можно наклепать много

## Что не сделано:
- рефакторинг userSchema.ts, разделение с наскока не получилось. При экспорте/импорте частей схемы возникают ошибки. А так пока схема, резолверы, все в кучу 
- Swagger-схема для RestAPI пока из другого проекта
- валидация для входных данных graphQL, сделать несколько inputTypes
- в некоторых местах есть типы any, что нужно исправлять
- вынести типы в отдельные модули
- некоторые ошибки в ответе graphQL не обрабатываются 
- выкинуть Express на свалку истории, заменить на Nest/Fastify



