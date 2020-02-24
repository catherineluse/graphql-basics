const User = {
  User: {
    discussions(parent, args, { db }, info) {
      return db.discussions.filter(discussion => {
        return discussion.authorId === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.authorId === parent.id;
      });
    }
  }
};

export default User;
