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
    },
    sentMessages(parent, args, { db }, info) {
      return db.messages.filter(message => {
        return message.authorId === parent.id;
      })
    },
    receivedMessages(parent, args, { db }, info) {
      return db.messages.filter(message => {
        message.recipientId === parent.id;
      })
    }
  }
};

export default User;
