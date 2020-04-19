const Subscription = {
  count: {
      subscribe(parent, args, { pubsub }, info) {
        let count = 0;

        setInterval(() => {
            count++

            // Pass in name of channel,
            // data object to send,
            // and time in milliseconds
            pubsub.publish('count', {
                count
            }, 1000)
        })

        return pubsub.asyncIterator('count')
      }
  },
  comment: {
    subscribe(parent, { discussionId }, { db, pubsub }, info){
        const discussion = db.discussions.find((discussion) => discussion.id === discussionId && discussion.published)

        if(!discussion) {
          throw new Error('Discussion not found')
        }

        return pubsub.asyncIterator(`comment in discussion ${discussionId}`) // comment 44
      }
  }
}

export { Subscription as default }