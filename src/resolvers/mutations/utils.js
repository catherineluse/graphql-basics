const removeCommentsByUserId = (id, db) => {
  db.comments = db.comments.filter(comment => {
    // Keep only comments that aren't
    // authored by this user.
    return comment.authorId !== id;
  });
};

const removeDiscussionsByUserId = (id, db) => {
  db.discussions = db.discussions.filter(discussion => {
    const match = discussion.authorId === id;

    if (match) {
      removeCommentsByDiscussionId(match.id, db);
    }

    // Keep only discussions that are not
    // authored by the deleted user.
    return !match;
  });
};

const checkThatUserExists = (id, db) => {
  const userExists = db.users.some(user => user.id === id);

  if (!userExists) {
    throw new Error("User not found");
  }
};
const checkThatDiscussionExists = (id, db) => {
  const discussionExists = db.discussions.some(
    discussion => discussion.id === id
  );

  if (!discussionExists) {
    throw new Error("Discussion not found");
  }
};

const checkThatCommunityExists = (id, db) => {
  const communityExists = db.communities.some(
    community => community.id === id
  );

  if (!communityExists) {
    throw new Error("Community not found");
  }
};

const checkThatCommunityDoesNotExist = (id, db) => {
  const communityExists = db.communities.some(
    community => community.id === id
  );

  if (communityExists) {
    throw new Error("Community already exists");
  }
};

const removeDiscussionsByCommunityId = (id, db) => {
  checkThatCommunityExists(id, db)

  const discussions = db.discussions.filter(discussion => {
    console.log('discussion\'s community ID is ' + discussion.communityId)
    return discussion.communityId === id
  })
  
  for (let i = 0; i < discussions.length; i++){
    const discussion = discussions[i]
    const discussionId = discussion.id
    console.log('discussion is ', discussion)

    db.comments = db.comments.filter(comment => {
      return comment.discussionId !== discussionId;
    })
  }
  
  db.discussions = db.discussions.filter(discussion => {
    return discussion.communityId !== id;
  });
}

module.exports = {
  removeCommentsByUserId,
  removeDiscussionsByUserId,
  checkThatUserExists,
  checkThatDiscussionExists,
  checkThatCommunityExists,
  checkThatCommunityDoesNotExist,
  removeDiscussionsByCommunityId
};
