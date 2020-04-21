import uuidv4 from "uuid/v4";
import { 
  checkThatUserExists, 
  removeCommentsByDiscussionId,
  checkThatCommunityExists
} from "./utils";
import { pubsub } from "graphql-yoga";

const Discussion = {
  createDiscussion(parent, args, { db }, info) {
    const { authorId, communityId, title, body, published } = args.data;
    if (!authorId || !communityId || !title || !body || published === undefined) {
      throw new Error("Invalid arguments passed to createDiscussion");
    }
    checkThatUserExists(authorId, db);
    checkThatCommunityExists(communityId, db)

    const discussion = {
      id: uuidv4(),
      ...args.data
    };

    db.discussions.push(discussion);
    pubsub.publish(`discussion in community ${communityId}`, { discussion })
    return discussion;
  },
  updateDiscussion(parent, args, { db }, info){
    const { id, data } = args;
    const { title, body, published } = data;
    console.log("discussions are ", db.discussions)
    const discussionIndex = db.discussions.findIndex(discussion => discussion.id === id);
    const discussion = db.discussions[discussionIndex];

    if (typeof title === 'string') {
      discussion.title = title;
    }

    if (typeof body === 'string') {
      discussion.body = body;
    }

    if (typeof published === 'boolean') {
      discussion.published = published
    }
    return discussion
  },
  deleteDiscussion(parent, args, { db }, info) {
    const discussionIndex = db.discussions.findIndex(discussion => discussion.id === discussion.id);

    if (discussionIndex === -1) {
      throw new Error("Could not find discussion by ID in deleteDiscussion");
    }
    removeCommentsByDiscussionId(args.id, db);

    const deletedDiscussion = db.discussions.splice(discussionIndex, 1);

    return deletedDiscussion[0];
  }
};

export default Discussion;