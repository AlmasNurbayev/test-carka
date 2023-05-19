import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { authUserService, createUserService, deleteUserService, getUsersService } from '../modules/user/user.service';
import { userCreateT, userT } from '../modules/user/types';
import { register } from '../auth/auth.controller';
import { authResolve } from './userResolve';



/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
// export const testSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => 'world',
//       },
//     },
//   }),
// });

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (user) => user.id,
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    password: {
      type: GraphQLString,
      resolve: (user) => user.password,
    },     
    role: {
      type: GraphQLString,
      resolve: (user) => user.role,
    },
    token: {
      type: GraphQLString,
      //resolve: (user) => authResolve({email: user.email, password: user.password}),
    },    
    create_date: {
      type: GraphQLString,
      resolve: (user) => user.create_date,
    },
    changed_date: {
      type: GraphQLString,
      resolve: (user) => user.changed_date,
    },
  }),
});

const userQuery = {
  type: new GraphQLList(UserType),
  description: 'The query that get all users or by arguments',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    role: {
      name: 'role',
      type: GraphQLString,
    },

  },
  resolve: (user: any, args: userT) => getUsersService({where: args}),
};

const userCreate = {
  type: UserType,
  description: 'The mutation that allows you to create a new user',
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (value: any, args: userCreateT) => {
    args.role = 'user';
    return createUserService(args);
  },
};

const userDelete = {
  type: UserType,
  description: 'The mutation delete user by id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (value: any, args: {id: number}) => {
    return deleteUserService({where: args});
  },
};

const auth = {
  type: UserType,
  description: 'The mutation auth user by email, password. Return token',
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString),
    },    
  },
  resolve: (value: any, args: {email: string, password: string}) => {
    return authResolve(args);
  },
};

export const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    users: userQuery,
    //note: noteQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    userCreate: userCreate,
    userDelete: userDelete,
    auth: auth,
  }),
});

export const rootSchema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,  
});
