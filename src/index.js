import { GraphQLServer, PubSub } from "graphql-yoga";
import queryResolvers from "./resolvers/queries/Query";
import mutationResolvers from "./resolvers/mutations/Mutation";
import Subscription from './resolvers/Subscription';
import db from "./db";

console.log(" query resolvers are ", queryResolvers);
console.log(" mutation resolvers are ", mutationResolvers);

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
