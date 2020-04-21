const Community = {
    Community: {
      discussions(parent, args, { db }, info) {
        return db.discussions.filter(comment => {
          return discussion.communityId === parent.id;
        });
      },
  
      creatorId(parent, args, { db }, info) {
        return db.users.find(user => {
          return user.id === parent.creatorId;
        });
      }
    }
  };
  
  export default Community;
  