const queryTypes = `
type Query {
    users(query: String): [User!]!
    discussions(query: String): [Discussion!]!
    comments(query: String): [Comment!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    discussions: [Discussion]!
    comments: [Comment]!
}

type Discussion {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  discussion: Discussion!
  parentCommentId: ID
  childComments: [Comment]
}
`;

export default queryTypes;
