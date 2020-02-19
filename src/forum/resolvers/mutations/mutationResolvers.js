import uuidv4 from "uuid/v4";
import users from "../../data/users";
import posts from "../../data/posts";
import comments from "../../data/comments";

function checkThatUserExists(id) {
  const userExists = users.some(user => user.id === id);

  if (!userExists) {
    throw new Error("User not found");
  }
}
function checkThatPostExists(id) {
  const postExists = posts.some(post => post.id === id);

  if (!postExists) {
    throw new Error("Post not found");
  }
}

const mutationResolvers = {
  Mutation: {
    createUser(parent, args, ctx, info) {
      const { name, email } = args.data;

      if (!name || !email) {
        throw new Error("Invalid arguments to createUser");
      }

      const emailTaken = users.some(user => {
        return user.email === email;
      });

      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data,
        comments: [],
        posts: []
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const { author, title, body, published } = args.data;
      if (!author || !title || !body || published === undefined) {
        throw new Error("Invalid arguments passed to creatPost");
      }
      checkThatUserExists(author);

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const { text, author, post } = args.data;

      if (!text || !author || !post) {
        throw new Error("Invalid arguments to createComment");
      }
      checkThatUserExists(author);
      checkThatPostExists(post);

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment);
      return comment;
    }
  }
};

export default mutationResolvers;
