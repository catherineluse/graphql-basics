import uuidv4 from "uuid/v4";
import { 
  checkThatUserExists, 
  removeCommentsByDiscussionId,
  checkThatCommunityExists
} from "./utils";

const Discussion = {
  createDiscussion(parent, args, { db, pubsub }, info) {
    const { authorId, communityId, title, body, published } = args.data;
    
    if (!authorId || !communityId || !title || !body || !published === undefined) {
      throw new Error("Invalid arguments passed to createDiscussion");
    }

    checkThatUserExists(authorId, db);
    checkThatCommunityExists(communityId, db)

    const discussion = {
      id: uuidv4(),
      ...args.data
    };

    db.discussions.push(discussion);

    if(published) {
      pubsub.publish(`discussion in community ${communityId}`, { 
        discussion: {
          mutation: 'CREATED',
          data: discussion
        }
      })
    }
    return discussion;
  },
  updateDiscussion(parent, args, { db, pubsub }, info){
    const { id, data } = args;
    const { title, body, published } = data;
    const discussionIndex = db.discussions.findIndex(discussion => discussion.id === id);
    const originalDiscussion = db.discussions[discussionIndex];
  

    if (typeof title === 'string') {
      discussion.title = title;
    }

    if (typeof body === 'string') {
      discussion.body = body;
    }

    if (typeof published === 'boolean') {
      discussion.published = published

      if (originalDiscussion.published && !discussion.published){
        //deleted
        pubsub.publish(`discussion in community ${originalDiscussion.communityId}`, {
          discussion: {
              mutation: 'DELETED',
              data: originalDiscussion
          }
        })
      } else if (!originalDiscussion.published && discussion.published) {
        //created 
        pubsub.publish(`discussion in community ${originalDiscussion.communityId}`, {
          discussion: {
            mutation: 'CREATED',
            data
          }
        })
      } else if (discussion.published) {
        //updated
        pubsub.publish(`discussion in community ${originalDiscussion.communityId}`, {
          discussion: {
            mutation: 'UPDATED',
            data
          }
        })
      }
    }
    return discussion
  },
  deleteDiscussion(parent, args, { db, pubsub }, info) {
    const discussionIndex = db.discussions.findIndex(discussion => discussion.id === args.id);

    if (discussionIndex === -1) {
      throw new Error("Could not find discussion by ID in deleteDiscussion");
    }
    removeCommentsByDiscussionId(args.id, db);

    const [ deletedDiscussion ] = db.discussions.splice(discussionIndex, 1);
    
    if (deletedDiscussion.published){
      pubsub.publish(`discussion in community ${deletedDiscussion.communityId}`, {
        discussion: {
          mutation: 'DELETED',
          data: deletedDiscussion
        }
      })
    }
    return deletedDiscussion;
  }
};

export default Discussion;