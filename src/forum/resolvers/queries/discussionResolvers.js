import users from "../../data/users";
import comments from "../../data/comments";

const discussionResolvers = {
  Discussion: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.discussion === parent.id;
      });
    }
  }
};

export default discussionResolvers;
