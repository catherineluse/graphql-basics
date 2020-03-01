import uuidv4 from "uuid/v4";
import { removeDiscussionsByUserId, removeCommentsByUserId } from "./utils";

const emailTaken = (db, email) => {
  db.users.some(user => {
    return user.email === email;
  });
}

const getUserIndex = (db, id) => {
  const userIndex = db.users.findIndex(user => user.id === id);
  console.log("looking for id ", id)
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  return userIndex;
}

const User = {
  createUser(parent, args, { db }, info) {
    const { name, email } = args.data;

    if (!name || !email) {
      throw new Error("Invalid arguments to createUser");
    }

    if (emailTaken(db, email)) {
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
  updateUser(parents, args, { db }, info) {
    const { id, data } = args;
    const { name, email, age } = data;
    const userIndex = getUserIndex(db, id);
    const user = db.users[userIndex];

    if (typeof email === 'string') {
      if (emailTaken(db, email)) {
        throw new Error("Email taken.");
      }
      user.email = email;
    }

    if (typeof age === null || typeof age === "integer") {
      user.age = age;
    }

    if (typeof name === 'string') {
      user.name = name;
    }
    return user
  },
  deleteUser(parent, args, { db }, info) {
    const { id } = args;
    const userIndex = getUserIndex(db, id);
    const deletedUser = db.users.splice(userIndex, 1);
    removeDiscussionsByUserId(id, db);
    removeCommentsByUserId(id, db);
    return deletedUser[0];
  }
};

export default User;
