import users from "../../data/users";
import comments from "../../data/comments";

const postResolvers = {
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  }
};

export default postResolvers;
