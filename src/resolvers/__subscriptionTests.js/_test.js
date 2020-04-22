// subscription {
//     discussion(communityId:"1") {
//       id 
//       title
//       body
//       authorId {
//         id 
//         name
//       }
//     }
//   }



// mutation{
//     createMessage(
//       data:{
//         text:"hi what's up",
//         authorId:"2"
//         recipientId: "1"
//       }
//     ){
//       text
//       authorId {
//         name
//       }
//       recipientId {
//         name
//       }
//     }
//   }

// mutation {
//     createRootComment(data: {
//       discussionId: "1"
//       authorId:"1"
//       text: "I've been thinking"
//     }) {
//       authorId{
//         name
//       }
//       text
//     }
//   }


// Need to also test update and
// delete routes for comment and discussion