import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { createUserService, getUsersService } from '../modules/user/user.service';
import { userT } from '../modules/user/types';
import { register } from '../auth/auth.controller';



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
    role: {
      type: GraphQLString,
      resolve: (user) => user.role,
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
      name: 'notes',
      type: GraphQLString,
    },
    create_date: {
      name: 'create_date',
      type: GraphQLString,
    },
    changed_date: {
      name: 'changed_date',
      type: GraphQLString,
    },
  },
  resolve: (user: any, args: userT) => getUsersService(args),
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
  resolve: (value: any, args: userT) => createUserService(args),
  
};

export const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    users: userQuery,
    //note: noteQuery,
  }),
});

export const rootSchema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
});
