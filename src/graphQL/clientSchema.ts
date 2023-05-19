import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { clientT } from "../modules/client/types";
import { createClientService, getClientsService } from "../modules/client/client.service";

export const clientType = new GraphQLObjectType({
  name: 'Client',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (client) => client.id,
    },
    name: {
      type: GraphQLString,
      resolve: (client) => client.name,
    },    
    phone: {
      type: GraphQLString,
      resolve: (client) => client.phone,
    },    
    email: {
      type: GraphQLString,
      resolve: (client) => client.email,
    },
    city: {
      type: GraphQLString,
      resolve: (client) => client.city,
    },
    district: {
      type: GraphQLString,
      resolve: (client) => client.district,
    },     
    wish: {
      type: GraphQLString,
      resolve: (client) => client.wish,
    },
    create_date: {
      type: GraphQLString,
      resolve: (client) => client.create_date,
    },
    changed_date: {
      type: GraphQLString,
      resolve: (client) => client.changed_date,
    },
  }),
});

export const clientQuery = {
  type: new GraphQLList(clientType),
  description: 'The query that get all client or by arguments',
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
    phone: {
      name: 'role',
      type: GraphQLString,
    },
    city: {
      name: 'role',
      type: GraphQLString,
    },
    district: {
      name: 'role',
      type: GraphQLString,
    },

  },
  resolve: (user: any, args: clientT) => getClientsService({where: args}),
};


export const clientCreate = {
  type: clientType,
  description: 'The mutation that allows you to create a new client',
  args: {
    phone: {
      name: 'phone',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    city: {
      name: 'city',
      type: GraphQLString,
    },
    district: {
      name: 'district',
      type: GraphQLString,
    },     
    wish: {
      name: 'wish',
      type: GraphQLString,
    },
  },
  resolve: async (value: any, args: clientT) => {
    const res: any = await createClientService(args);
    if (!res.error) {
      return res;
    } else {
      throw new Error(res.error);
    }    
  },
};
