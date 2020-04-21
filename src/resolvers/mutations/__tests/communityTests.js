// mutation {
//     createCommunity(data:{
//       creatorId:"1",
//       url:"notpets",
//       name: "not pes"
//       description:"animals that are not pets",
//       createdDate:"Sunday April 19, 2020"
//     }) {
//       id,
//       creatorId {
//         name
//       },
//       name,
//       description
//     }
//   }

// mutation {
//     updateCommunity(
//       id:"1e0e3fcb-dab7-4b95-9496-b6f0d2a888ff", 
//       data: {
//         description: "this is an updated description",
//         name:"this is an updated name"
//       }
//     ) {
//       id,
//       url,
//       name,
//       description
//     }
//   }

// mutation {
//     deleteCommunity(id:"c5de06a1-45be-47cb-83e3-6ddfee271222"){
//       id
//       url 
//       name
//       description
//     }
//   }


// Setup to test deletion

// mutation {
//     createCommunity(data:{
//       creatorId:"1",
//       url:"random",
//       name: "random"
//       description:"random",
//       createdDate:"Monday"
//     }) {
//       id,
//       creatorId {
//         name
//       },
//       name,
//       description
//     }
//   }

//   mutation {
//     createDiscussion (data: {
//         title: "discussion title"
//         communityId: "2998f63b-a946-484b-b37e-bbcc7d992d16"
//         body: "this is a body text"
//         published: true
//         authorId: "1"
//     }){
//       id
//       title
//       communityId {
//         id
//         name 
//         url
//       }
//       body 
//       published
//     }
//   }


//   mutation {
//     createRootComment (data:{
//       authorId:"1",
//       discussionId:"95e7fae0-e469-4902-9011-457776361713"
//       text:"is anybody here?"
//     }){
//       id
//       discussionId {
//         title
//       }
//       authorId {
//         name
//       }
//       text
//     }
//   }

//   mutation {
//     deleteCommunity(id:"2998f63b-a946-484b-b37e-bbcc7d992d16"){
//       id
//       url 
//       name
//       description
//     }
//   }

  // Then confirm discussion and comment within 
  // community are deleted.