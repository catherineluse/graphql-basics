import uuidv4 from "uuid/v4";
import { 
  checkThatUserExists, 
  checkThatDiscussionExists, 
  checkThatCommentExists 
} from "./utils";
import { pubsub } from "graphql-yoga";

const Comment = {
  createRootComment(parent, args, { db, pubsub }, info) {
    const { text, authorId, discussionId } = args.data;

    if (!text || !authorId || !discussionId) {
      throw new Error("Invalid arguments to createRootComment");
    }
    checkThatUserExists(authorId, db);
    checkThatDiscussionExists(discussionId, db);

    const comment = {
      id: uuidv4(),
      ...args.data,
      childComments: []
    };

    db.comments.push(comment);
    pubsub.publish(`comment in discussion ${discussionId}`, { comment })
    return comment;
  },

  createChildComment(parent, args, { db, PubSub }, info) {
    const { text, authorId, discussionId } = args.data;
    const parentCommentId = parent.id;

    if (!text || !authorId || !discussionId || !parentCommentId) {
      throw new Error("Invalid arguments to createComment");
    }
    checkThatUserExists(authorId, db);
    checkThatDiscussionExists(discussionId, db);
    checkThatParentCommentExists(parentCommentId, db);

    const comment = {
      id: uuidv4(),
      ...args.data,
      parentCommentId,
      childComments: []
    };

    db.comments.push(comment);
    pubsub.publish(`comment in discussion ${discussionId}`, { comment })
    return comment;
  },

  updateComment(parent, args, { db }, info) {
    const id = args.id;
    const { text } = args.data;
    
    if (!text) {
      return;
    }

    let commentIndex = db.comments.findIndex( comment => comment.id === id);

    if (commentIndex === -1) {
      throw new Error("Could not find comment by ID in updateComment");
    }

    let comment = db.comments[commentIndex];

    comment.text = text;

    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error("Could not find comment by ID in deleteComment");
    }

    const deletedComment = db.comments.splice(commentIndex, 1);

    return deletedComment[0];
  }
};

export default Comment;
