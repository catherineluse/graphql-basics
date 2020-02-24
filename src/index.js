import { GraphQLServer } from "graphql-yoga";
import queryResolvers from "./resolvers/queries/Query";
import mutationResolvers from "./resolvers/mutations/Mutation";
import db from "./db";

console.log(" query resolvers are ", queryResolvers);
console.log(" mutation resolvers are ", mutationResolvers);

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("The server is up!");
});
