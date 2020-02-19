import commentResolvers from "./commentResolvers";
import postResolvers from "./postResolvers";
import userResolvers from "./userResolvers";
import posts from "../../data/posts";
import users from "../../data/users";
import comments from "../../data/comments";

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return (
          post.title.indexOf(args.query) !== -1 ||
          post.body.indexOf(args.query) !== -1
        );
      });
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
  ...postResolvers,
  ...userResolvers
};

export default queryResolvers;
