const getCommentById = (id, db) => {
  const res = db.comments.find(comment => {
    return comment.id === id;
  });
  if (!res) {
    throw new Error("Could not find comment by ID.");
  }
  return res;
};

const Comment = {
  Comment: {
    authorId(parent, args, { db }, info) {
      return db.users.find(user => {
        return parent.authorId === user.id;
      });
    },
    discussionId(parent, args, { db }, info) {
      return db.discussions.find(discussion => {
        return parent.discussionId === discussion.id;
      });
    },
    childComments(parent, args, { db }, info) {
      let childIds = parent.childComments;

      if (!parent || !childIds) {
        return [];
      }
      return childIds.map(id => {
        return getCommentById(id, db);
      });
    }
  }
};

export default Comment;
