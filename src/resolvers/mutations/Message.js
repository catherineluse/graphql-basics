// input CreateMessageInput {
//     text: String!
//     authorId: ID!
//     recipientId: ID!
//     createdDate: String!
//   }

import uuidv4 from "uuid/v4";
import { checkThatUserExists } from "./utils";
import { pubsub } from "graphql-yoga";

const publishMessage = (recipientId, message) => {
  pubsub.publish(`message for recipient ${recipientId}`, { message })
}

const Message = {
  createMessage(parent, args, { db }, info) {
    const { text, authorId, recipientId } = args.data;

    if (!text || !authorId || !recipientId ) {
      throw new Error("Invalid arguments to createMessage");
    }
    checkThatUserExists(authorId, db);
    checkThatUserExists(recipientId, db);

    const message = {
      id: uuidv4(),
      ...args.data,
      createdDate: new Date()
    };

    db.messages.push(message);
    pubsub.publish(`message for recipient ${recipientId}`, { message })
    return message;
  },
  updateMessage(parent, args, { db }, info) {
    const id = args.id;
    const { text } = args.data;
    
    if (text === undefined) {
      throw new Error("No text submitted to updateMessage")
    }

    let messageIndex = db.messages.findIndex( message => message.id === id);

    if (messageIndex === -1) {
      throw new Error("Could not find message by ID in updateMessage");
    }

    let message = db.messages[messageIndex];

    message.text = text;
    message["updateDate"] = new Date();

    return message;
  },
  deleteMessage(parent, args, { db }, info) {
    const messageIndex = db.messages.findIndex(
      message => message.id === args.id
    );

    if (messageIndex === -1) {
      throw new Error("Could not find message by ID in deleteMessage");
    }

    const deletedMessage = db.messages.splice(messageIndex, 1);

    return deletedMessage[0];
  }
};

export default Message;
