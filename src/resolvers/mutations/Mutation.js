import Comment from "./Comment";
import Discussion from "./Discussion";
import User from "./User";

const mutationResolvers = {
  Mutation: {
    ...Comment,
    ...Discussion,
    ...User
  }
};

export default mutationResolvers;
