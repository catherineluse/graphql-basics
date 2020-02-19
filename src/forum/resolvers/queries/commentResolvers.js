import users from "../../data/users";
import posts from "../../data/posts";

const commentResolvers = {
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return parent.author === user.id;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return parent.post === post.id;
      });
    }
  }
};

export default commentResolvers;
