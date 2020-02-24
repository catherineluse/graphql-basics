import uuidv4 from "uuid/v4";
import { removeDiscussionsByUserId, removeCommentsByUserId } from "./utils";

const User = {
  createUser(parent, args, { db }, info) {
    const { name, email } = args.data;

    if (!name || !email) {
      throw new Error("Invalid arguments to createUser");
    }

    const emailTaken = db.users.some(user => {
      return user.email === email;
    });

    if (emailTaken) {
      throw new Error("Email taken.");
    }

    const user = {
      id: uuidv4(),
      ...args.data,
      comments: [],
      discussions: []
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error("Couldn't find user by ID in deleteUser");
    }

    const deletedUser = db.users.splice(userIndex, 1);

    removeDiscussionsByUserId(id, db);
    removeCommentsByUserId(id, db);

    return deletedUser[0];
  }
};

export default User;
