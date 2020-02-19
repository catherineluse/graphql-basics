const queryTypes = `
type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post]!
    comments: [Comment]!
}

type Post {
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
  post: Post!
}  
`;

export default queryTypes;
