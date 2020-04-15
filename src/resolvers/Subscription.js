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
  }
}

export { Subscription as default }