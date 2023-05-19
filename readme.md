# test-carka
Тестовое задание для graphQL в связке с Express

## restAPI:
 - 3 restAPI ендпойнта (POST /api/auth, POST api/register, GET api/user)
 - авторизация возвращает JWT на 24 часа
 - возвращаются осмысленные коды ошибок (400, 403) и сообщения 

## GraphQL:
 - ендпойнт - POST /api/graphqL. Реализован пока только 1 модуль User
 - Query - 1 запрос users. Например:
 "query { users  {
    id 
    email
    create_date
    password
    role
    name
  } 
}" 
 - Mutations - запросы auth, userCreate, userDelete, userUpdate. Например:
"
 mutation { userCreate 
        (email: "test3",
        password: "123456") 
        { id, email, password }
 }
"
- авторизация возвращает JWT на 24 часа
- по умолчанию новые пользователи имеют роль user. 
- доступность запросов для разных ролей регулируется в модуле src/middleware/accessRoles.ts. Для этого в middleware проверяются 2 первых слова из запроса и проверяется на сопоставление с ACL-объектом
- в некоторых случаях (но не во всех) в ответе возвращаются осмысленные ошибки с кодом 200  
            
## Используемый стек:
 - node.js с модулями - express, graphql, graphql-http,  pino (логи)
 - база данных - ORM Prisma подключенная к Postgres
 - размещение - будет размещено на VPS-сервере http://45.146.167.130:3003/api/graphQL
   
## Postman:
 - в корне репозитория размещена коллекция запросов: test-carka.postman_collection.json 

## Что не сделано:
- рефакторинг userSchema.ts
- Swagger-схема для RestAPI
- в некоторых местах есть типы any
- вынести типы в отдельные модули
- некоторые ошибки в ответе graphQL не обрабатываются 
- тесты



