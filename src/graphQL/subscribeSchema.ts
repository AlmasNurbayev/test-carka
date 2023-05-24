import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const subscribeType = new GraphQLObjectType({
  name: 'Client',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (subscribe) => subscribe.id,
    },
    client_id: {
      type: GraphQLInt,
      resolve: (subscribe) => subscribe.client_id,
    },    
    sms_send: {
      type: GraphQLBoolean,
      resolve: (subscribe) => subscribe.sms_send,
    },    
    sms_date_end: {
      type: GraphQLString ,
      resolve: (subscribe) => subscribe.sms_date_end,
    },
    email_send: {
      type: GraphQLBoolean,
      resolve: (subscribe) => subscribe.email_send,
    },
    email_date_end: {
      type: GraphQLString,
      resolve: (subscribe) => subscribe.email_date_end,
    },     
    create_date: {
      type: GraphQLString,
      resolve: (subscribe) => subscribe.create_date,
    },
    changed_date: {
      type: GraphQLString,
      resolve: (subscribe) => subscribe.changed_date,
    },
  }),
});