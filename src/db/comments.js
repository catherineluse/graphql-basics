// type Comment {
//   id: ID!
//   text: String!
//   authorId: User!
//   discussion: Discussion!
//   parentCommentId: ID
//   childComments: [Comment]
// }

const comments = [
  {
    id: "1",
    text: "cool",
    authorId: "1",
    discussionId: "1",
    childComments: []
  },
  {
    id: "2",
    text: "sweet",
    authorId: "3",
    discussionId: "1",
    childComments: []
  },
  {
    id: "3",
    text: "dude",
    authorId: "2",
    discussionId: "3",
    childComments: []
  },
  {
    id: "4",
    text: "snazzy",
    authorId: "2",
    discussionId: "3",
    childComments: []
  },
  {
    id: "5",
    text: "Parent comment",
    authorId: "1",
    discussionId: "3",
    childComments: ["6", "7"]
  },
  {
    id: "6",
    text: "Child comment",
    authorId: "3",
    discussionId: "3",
    parentCommentId: "5",
    childComments: ["8"]
  },
  {
    id: "7",
    text: "Sibling of child comment",
    authorId: "2",
    discussionId: "3",
    parentCommentId: "5",
    childComments: []
  },
  {
    id: "8",
    text: "Grandchild comment",
    authorId: "1",
    discussionId: "5",
    parentCommentId: "6",
    childComments: []
  }
];

export default comments;
