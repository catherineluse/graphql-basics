import uuidv4 from "uuid/v4";
import users from "../../data/users";
import discussions from "../../data/discussions";
import comments from "../../data/comments";

function checkThatUserExists(id) {
  const userExists = users.some(user => user.id === id);

  if (!userExists) {
    throw new Error("User not found");
  }
}
function checkThatDiscussionExists(id) {
  const discussionExists = discussions.some(discussion => discussion.id === id);

  if (!discussionExists) {
    throw new Error("Discussion not found");
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
        discussions: []
      };

      users.push(user);

      return user;
    },
    createDiscussion(parent, args, ctx, info) {
      const { author, title, body, published } = args.data;
      if (!author || !title || !body || published === undefined) {
        throw new Error("Invalid arguments passed to creatDiscussion");
      }
      checkThatUserExists(author);

      const discussion = {
        id: uuidv4(),
        ...args.data
      };

      discussions.push(discussion);

      return discussion;
    },
    createRootComment(parent, args, ctx, info) {
      const { text, author, discussion } = args.data;

      if (!text || !author || !discussion) {
        throw new Error("Invalid arguments to createComment");
      }
      checkThatUserExists(author);
      checkThatDiscussionExists(discussion);

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment);
      return comment;
    },
    createChildComment(parent, args, ctx, info) {
      const { text, author, discussion } = args.data;
      const parentCommentId = parent.id;

      if (!text || !author || !discussion) {
        throw new Error("Invalid arguments to createComment");
      }
      checkThatUserExists(author);
      checkThatDiscussionExists(discussion);

      const comment = {
        id: uuidv4(),
        ...args.data,
        parentCommentId
      };

      comments.push(comment);
      return comment;
    }
  }
};

export default mutationResolvers;
