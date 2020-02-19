import users from "../../data/users";
import discussions from "../../data/discussions";
import comments from "../../data/comments";

const commentResolvers = {
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return parent.author === user.id;
      });
    },
    discussion(parent, args, ctx, info) {
      return discussions.find(discussion => {
        return parent.discussion === discussion.id;
      });
    },
    childComments(parent, args, ctx, info) {
      let childIds = parent.childComments;

      if (!parent || !childIds) {
        return null;
      }

      let children = [];

      childIds.forEach(id => {
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i];
          if (comment.id === id) {
            children.push(comment);
            return;
          }
        }
      });
      return children;
    }
  }
};

export default commentResolvers;
