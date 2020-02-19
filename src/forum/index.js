import { GraphQLServer } from "graphql-yoga";
import queryResolvers from "./resolvers/queries/queryResolvers";
import mutationResolvers from "./resolvers/mutations/mutationResolvers";
import inputTypes from "./typedefs/inputTypes";
import mutationTypes from "./typedefs/mutationTypes";
import queryTypes from "./typedefs/queryTypes";

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers
};

console.log("resolvers are ", resolvers);

const typeDefs = `${inputTypes} ${mutationTypes} ${queryTypes}`;

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
