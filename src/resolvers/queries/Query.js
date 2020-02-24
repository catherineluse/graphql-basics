import Comment from "./Comment";
import Discussion from "./Discussion";
import User from "./User";

const Query = {
  Query: {
    discussions(parent, args, { db }, info) {
      if (!args.query) {
        return db.discussions;
      }
      return db.discussions.filter(discussion => {
        return (
          discussion.title.indexOf(args.query) !== -1 ||
          discussion.body.indexOf(args.query) !== -1
        );
      });
    },
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      return db.users.filter(ele => {
        return args.query.toLowerCase() === ele.name.toLowerCase();
      });
    },
    comments(parent, args, { db }, info) {
      if (!args.query) {
        return db.comments;
      }
      return db.comments.filter(ele => {
        return ele.text.indexOf(args.query) !== -1;
      });
    },
    getDiscussion(parent, args, { db }, info) {
      if (!args.id) {
        return new Error("Must provide a discussion ID");
      }
      return db.discussions.find(discussion => discussion.id === args.id);
    },
    getUser(parent, args, { db }, info) {
      if (!args.id) {
        return new Error("Must provide a user ID");
      }
      return db.users.find(user => user.id === args.id);
    },
    getComment(parent, args, { db }, info) {
      if (!args.id) {
        return new Error("Must provide a comment ID");
      }
      return db.comments.find(comment => comment.id === args.id);
    }
  }
};

const queryResolvers = {
  ...Query,
  ...Comment,
  ...Discussion,
  ...User
};

export default queryResolvers;
