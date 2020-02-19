const inputTypes = `
  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreateDiscussionInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    discussion: ID!
  }
`;

export default inputTypes;
