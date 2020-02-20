import users from "../../data/users";
import discussions from "../../data/discussions";
import comments from "../../data/comments";

const getCommentById = id => {
  const res = comments.find(comment => {
    return comment.id === id;
  });
  if (!res) {
    throw new Error("Could not find comment by ID.");
  }
  return res;
};

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
        return [];
      }
      return childIds.map(id => {
        return getCommentById(id);
      });
    }
  }
};

export default commentResolvers;
