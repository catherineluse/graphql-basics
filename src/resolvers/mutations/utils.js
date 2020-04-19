const removeCommentsByDiscussionId = (id, db) => {
  db.comments = db.comments.filter(comment => {
    // Keep only comments that don't
    // belong to this post.
    return comment.discussionId !== id;
  });
};

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

const checkThatCommentExists = (id, db) => {
  const commentExists = db.comments.some(
    comment => comment.id === id
  );

  if (!commentExists) {
    throw new Error("Comment not found")
  }
}

module.exports = {
  removeCommentsByDiscussionId,
  removeCommentsByUserId,
  removeDiscussionsByUserId,
  checkThatUserExists,
  checkThatDiscussionExists
};
