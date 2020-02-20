// type Comment {
//   id: ID!
//   text: String!
//   author: User!
//   discussion: Discussion!
//   parentCommentId: ID
//   childComments: [Comment]
// }

const comments = [
  {
    id: "1",
    text: "cool",
    author: "1",
    discussionId: "1"
  },
  {
    id: "2",
    text: "sweet",
    author: "3",
    discussionId: "1"
  },
  {
    id: "3",
    text: "dude",
    author: "2",
    discussionId: "3"
  },
  {
    id: "4",
    text: "snazzy",
    author: "2",
    discussionId: "3"
  },
  {
    id: "5",
    text: "Parent comment",
    author: "1",
    discussionId: "3",
    childComments: ["6", "7"]
  },
  {
    id: "6",
    text: "Child comment",
    author: "3",
    discussionId: "3",
    parentCommentId: "5",
    childComments: ["8"]
  },
  {
    id: "7",
    text: "Sibling of child comment",
    author: "2",
    discussionId: "3",
    parentCommentId: "5"
  },
  {
    id: "8",
    text: "Grandchild comment",
    author: "1",
    discussionId: "5",
    parentCommentId: "6"
  }
];

export default comments;
