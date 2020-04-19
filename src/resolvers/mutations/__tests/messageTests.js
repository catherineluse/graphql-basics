// mutation {
//     createMessage(data:{
//       text:"Moving in four months",
//       authorId:"1",
//       recipientId:"3"
//     }){
//       text
//       id
//       authorId {
//         name
//       }
//       recipientId {
//         name
//       }
//     }
//   }


// mutation {
//     updateMessage(
//       id: "adb6bdb2-e35e-4c29-a0e7-5bfb00134323",
//       data:{text:"Moving in three months"
//     }){
//       id
//       authorId {
//         name
//       }
//       recipientId {
//         name
//       }
//       text
//     }
//   }



// mutation {
//     deleteMessage(id:"adb6bdb2-e35e-4c29-a0e7-5bfb00134323"){
//       id 
//       text
//     }
//   }


// query {
//     messages {
//       text,
//       authorId {
//         name
//       }
//       recipientId {
//         name
//       }
//     }
//   }