import discussions from "../../data/discussions";
import comments from "../../data/comments";

const userResolvers = {
  User: {
    discussions(parent, args, ctx, info) {
      return discussions.filter(discussion => {
        return discussion.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  }
};

export default userResolvers;
