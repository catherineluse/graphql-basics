import Comment from "./Comment";
import Discussion from "./Discussion";
import User from "./User";
import Message from './Message';
import Community from './Community';

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
    messages(parent, args, { db }, info) {
      return db.messages;
    },
    communities(parent, args, { db }, info) {
      return db.communities;
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
    },
    getMessage(parent, args, { db }, info) {
      if (!args.id) {
        return new Error("Must provide a message ID");
      }
      return db.messages.find(message => message.id === args.id)
    },
    getCommunity(parent, args, { db }, info) {
      if (!args.id) {
        return new Error("Must provide a community ID");
      }
      return db.communities.find(community => community.id === args.id)
    }
  }
};

const queryResolvers = {
  ...Query,
  ...Comment,
  ...Discussion,
  ...User,
  ...Message,
  ...Community
};

export default queryResolvers;
