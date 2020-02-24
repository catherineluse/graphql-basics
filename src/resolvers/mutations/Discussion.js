import uuidv4 from "uuid/v4";
import { checkThatUserExists, removeCommentsByDiscussionId } from "./utils";

const Discussion = {
  createDiscussion(parent, args, { db }, info) {
    const { authorId, title, body, published } = args.data;
    if (!authorId || !title || !body || published === undefined) {
      throw new Error("Invalid arguments passed to createDiscussion");
    }
    checkThatUserExists(authorId, db);

    const discussion = {
      id: uuidv4(),
      ...args.data
    };

    db.discussions.push(discussion);

    return discussion;
  },
  deleteDiscussion(parent, args, { db }, info) {
    const discussionIndex = db.posts.findIndex(post => post.id === args.id);

    if (discussionIndex === -1) {
      throw new Error("Could not find post by ID in deletePost");
    }

    const deletedDiscussion = db.posts.splice(postIndex, 1);

    removeCommentsByDiscussionId(args.id, db);

    return deletedDiscussion[0];
  }
};

export default Discussion;
