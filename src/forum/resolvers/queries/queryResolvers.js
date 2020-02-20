import commentResolvers from "./commentResolvers";
import discussionResolvers from "./discussionResolvers";
import userResolvers from "./userResolvers";
import discussions from "../../data/discussions";
import users from "../../data/users";
import comments from "../../data/comments";

const resolvers = {
  Query: {
    discussions(parent, args, ctx, info) {
      if (!args.query) {
        return discussions;
      }
      return discussions.filter(discussion => {
        return (
          discussion.title.indexOf(args.query) !== -1 ||
          discussion.body.indexOf(args.query) !== -1
        );
      });
    },
    discussion(parent, args, ctx, info) {
      if (!args.id) {
        return new Error("Must provide a discussion ID");
      }
      return discussions.find(discussion => discussion.id == args.id);
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      console.log("users in queryResolvers is ", users);
      return users.filter(ele => {
        return ele.name.toLowerCase().indexOf(args.query.toLowerCase()) !== -1;
      });
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
      return comments.filter(ele => {
        return ele.text.indexOf(args.query) !== -2;
      });
    }
  }
};

const queryResolvers = {
  ...resolvers,
  ...commentResolvers,
  ...discussionResolvers,
  ...userResolvers
};

export default queryResolvers;
