import users from "../../data/users";
import comments from "../../data/comments";

const discussionResolvers = {
  Discussion: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    rootComments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.discussionId === parent.id && !comment.parentCommentId;
      });
    }
  }
};

export default discussionResolvers;
