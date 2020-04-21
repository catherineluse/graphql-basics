import uuidv4 from "uuid/v4";
import { 
    checkThatUserExists, 
    removeDiscussionsByCommunityId,
    checkThatCommunityDoesNotExist
} from "./utils";

// type Community {
//     id: ID!
//     creatorId: ID!
//     url: String!
//     name: String!
//     description: String
//     createdDate: String!
//   }

const Community = {
  createCommunity(parent, args, { db }, info) {
    const { creatorId, url, name } = args.data;

    if (!creatorId || !url || !name === undefined) {
      throw new Error("Invalid arguments passed to createCommunity");
    }

    checkThatUserExists(creatorId, db);
    checkThatCommunityDoesNotExist(url, db)

    const createdDate = new Date()

    const community = {
      id: uuidv4(),
      ...args.data,
      createdDate
    };

    db.communities.push(community);

    return community;
  },

  updateCommunity(parent, args, { db }, info){
    const { id, data } = args;
    const { name, description } = data;

    const communityIndex = db.communities.findIndex(community => community.id === id);
    const community = db.communities[communityIndex];

    if (typeof name === 'string') {
      community.name = name;
    }

    if (typeof description === 'string') {
      community.description = description;
    }

    return community
  },
  deleteCommunity(parent, args, { db }, info) {
    const communityIndex = db.communities.findIndex(community => community.id === args.id);

    if (communityIndex === -1) {
      throw new Error("Could not find community by ID in deleteCommunity");
    }

    removeDiscussionsByCommunityId(args.id, db)

    const deletedCommunity = db.communities.splice(communityIndex, 1);

    return deletedCommunity[0];
  }
};

export default Community;
