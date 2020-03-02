import Comment from "./Comment";
import Discussion from "./Discussion";
import User from "./User";
import Message from "./Message";

const mutationResolvers = {
  Mutation: {
    ...Comment,
    ...Discussion,
    ...User,
    ...Message
  }
};

export default mutationResolvers;
