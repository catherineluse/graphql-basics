import Comment from "./Comment";
import Discussion from "./Discussion";
import User from "./User";
import Message from "./Message";
import Community from "./Community";

const mutationResolvers = {
  Mutation: {
    ...Comment,
    ...Discussion,
    ...User,
    ...Message,
    ...Community
  }
};

export default mutationResolvers;
