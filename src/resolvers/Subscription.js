const Subscription = {
  comment: {
    subscribe(parent, { discussionId }, { db, pubsub }, info){
        const discussion = db.discussions.find(discussion => {
          return discussion.id === discussionId && discussion.published
        })

        if(!discussion) {
          throw new Error('Discussion not found')
        }

        return pubsub.asyncIterator(`comment in discussion ${discussionId}`) // comment 44
      }
  },
  discussion: {
    subscribe(parent, { communityId }, {db, pubsub}, info){
      const community = db.communities.find(community => {
         return community.id === communityId;
      })

      if (!community){
        throw new Error('Community not found')
      }

      return pubsub.asyncIterator(`discussion in community ${communityId}`)
    }
  },
  message: {
    subscribe(parent, { recipientId }, { db, pubsub }, info){
      const recipient = db.users.find(user => {
        return user.id === recipientId;
      })

      if (!recipient){
        throw new Error('Recipient not found')
      }

      return pubsub.asyncIterator(`message for recipient ${recipientId}`)
    }
  },
}

export { Subscription as default }