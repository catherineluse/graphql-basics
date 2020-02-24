const Discussion = {
  Discussion: {
    rootComments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.discussionId === parent.id && !comment.parentCommentId;
      });
    },

    authorId(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.authorId;
      });
    }
  }
};

export default Discussion;
