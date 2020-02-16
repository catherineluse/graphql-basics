import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
// Scalar types - String, Boolean, Int, Float, ID

const users = [
  {
    id: '1',
    name: 'catherine',
    email: 'catherine.luse@gmail.com',
    age: 29
  },
  {
    id: '2',
    name: 'zack',
    email: 'zackofalltrades@gmail.com',
    age: 32
  },
  {
    id: '3',
    name: 'autumn',
    email: 'autumn@discoverywritten.com'
  }
]
const posts = [
  {
    id: '1',
    title: 'cat post',
    body: 'cats cats cats',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'dog post',
    body: 'dogs only',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'special post',
    body: 'secret',
    published: false,
    author: '2'
  }
]

const comments = [
  {
    id: '1',
    text: 'cool',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'sweet',
    author: '3',
    post: '1'
  },
  {
    id: '3',
    text: 'dude',
    author: '2',
    post: '3'
  },
  {
    id: '4',
    text: 'snazzy',
    author: '2',
    post: '3'
  },
  {
    id: '5',
    text: 'very special',
    author: '1',
    post: '3'
  }
]

function checkThatUserExists (id) {
  const userExists = users.some(user => user.id === id)

  if (!userExists) {
    throw new Error(
      'User not found' + JSON.stringify(args.author) + JSON.stringify(users)
    )
  }
}
function checkThatPostExists (id) {
  const postExists = posts.some(post => post.id === id)

  if (!postExists) {
    throw new Error(
      'User not found' + JSON.stringify(args.author) + JSON.stringify(users)
    )
  }
}
// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        greeting(name: String!): String!
        add(n1: Float!, n2: Float!): Float!
        addArr(arr: [Int!]!): Int!
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

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
      createComment(text: String!, author: ID!, post: ID!): Comment!
    }
`

// Resolvers
const resolvers = {
  Query: {
    me () {
      return {
        id: '123098',
        name: 'Catherine',
        email: 'catherine.luse@example.com'
      }
    },
    post () {
      return {
        id: '1242352',
        title: 'New Post',
        body: '',
        published: false
      }
    },
    posts (parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return posts.filter(post => {
        return (
          post.title.indexOf(args.query) !== -1 ||
          post.body.indexOf(args.query) !== -1
        )
      })
    },
    greeting (parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}`
      }
      return 'Hello'
    },
    add (parent, args, ctx, info) {
      return args.n1 + args.n2
    },
    addArr (parent, args, ctx, info) {
      if (!args.arr) {
        return []
      }
      return args.arr.reduce((acc, cur) => {
        return acc + cur
      })
    },
    users (parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter(ele => {
        return args.query.toLowerCase() === ele.name.toLowerCase()
      })
    },
    comments (parent, args, ctx, info) {
      if (!args.query) {
        return comments
      }
      return comments.filter(ele => {
        return ele.text.indexOf(args.query) !== -2
      })
    }
  },
  Mutation: {
    createUser (parent, args, ctx, info) {
      if (!args.name || !args.email) {
        throw new Error('Invalid arguments to createUser')
      }

      const emailTaken = users.some(user => {
        return user.email === args.email
      })

      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
        comments: [],
        posts: []
      }

      users.push(user)

      return user
    },
    createPost (parent, args, ctx, info) {
      if (
        !args.author ||
        !args.title ||
        !args.body ||
        args.published === undefined
      ) {
        throw new Error('Invalid arguments passed to creatPost')
      }
      checkThatUserExists(args.author)

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author
      }

      posts.push(post)

      return post
    },
    createComment (parent, args, ctx, info) {
      if (!args.text || !args.author || !args.post) {
        throw new Error('Invalid arguments to createComment')
      }
      checkThatUserExists(args.author)
      checkThatPostExists(args.post)
      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post
      }

      comments.push(comment)
      return comment
    }
  },
  Post: {
    author (parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
    comments (parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts (parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id
      })
    },
    comments (parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author (parent, args, ctx, info) {
      return users.find(user => {
        return parent.author === user.id
      })
    },
    post (parent, args, ctx, info) {
      return posts.find(post => {
        return parent.post === post.id
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})
