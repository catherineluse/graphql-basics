import { GraphQLServer, PubSub } from "graphql-yoga";
import queryResolvers from "./resolvers/queries/Query";
import mutationResolvers from "./resolvers/mutations/Mutation";
import Subscription from './resolvers/Subscription';
import db from "./db";

const pubsub = new PubSub();

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
  Subscription
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("The server is up!");
});
