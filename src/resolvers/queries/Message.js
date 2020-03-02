const Message = {
    Message: {
      authorId(parent, args, { db }, info) {
        const author = db.users.find(user => {
          return parent.authorId === user.id;
        });
        if (!author) {
            alert("Cannot find message author")
        }
        return author
      },
      recipientId(parent, args, { db }, info) {
        const recipient = db.users.find(user => {
            return parent.recipientId === user.id;
        });
        if (!recipient) {
            alert("Cannot find message recipient")
        }
        return recipient
      },
    }
  };
  
  export default Message;
  