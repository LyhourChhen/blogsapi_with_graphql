import { GraphQLServer } from 'graphql-yoga'
import {
    data as peoplesData,
    blogs as blogsData,
    comments as CommentData,
} from './dummyData'
// Type Definition || Schema (This is where our structure should look like)
// ! => It required field && if noting it will return null

const typeDefs = `
    type Query {
        greeting(name: String): String!
        hello: String!
        name: String!
        location: String!
        bio: String
        me: User!
        blog: Post!
        add(x: Float, y: Float ): String!
        grade: [Int!]!
        sumArray(numArray:[Float!]!): Float!
        people(search: String):[People!]!
        BlogsPost(search: String):[Blogs]!
        comments: [Comment!]!
    }
    type Query_with_scala {
        id: ID!
        name: String!
        age: Int!
        employment: Boolean!
        salary: Float
    }
    type User {
        id: ID!
        name: String!
        password: Float!
    }
    type Post {
        id: ID!
        article_name: String!
        paragraph: String!
        author: People!
    }
    type People {
        id: ID!
        name: String!
        age: Int
        posts: [Blogs]!
    }
    type Blogs { 
        id: ID!
        title : String!
        body : String!
        published: Boolean!
        author: People!
    }
    type Comment {
        id: ID!
        text: String!
    }
`

// Resolvers => The function where where schema need to be performs

const resolvers = {
    //This must be match with type
    Query: {
        hello: () => 'This is my First GraphQL Query',
        name: () => 'LyhourChhen',
        location: () => 'I live in PhnomPenh, City of 🇰🇭',
        bio: () =>
            'My name is LyhourChhen and i am also the software engineer who currently working with Frontend-Developments',
        me() {
            return {
                id: 1,
                name: 'LyhourChhen',
                password: 123456,
            }
        },
        blog: () => {
            return {
                id: 1,
                article_name: 'How to learn graphQL ?',
                paragraph:
                    'GraphQL is the best wat to deal with API faster and efficiency',
            }
        },

        // With arguments
        // There are 4 main arg in the resolver function (parent, args, ctx, info)
        greeting: (parent, args, ctx, info) => {
            // console.log('display args: ', parent, args, ctx, info)
            return args.name
                ? `Hello to the program : ${args.name}`
                : `Hello to the program !`
        },
        add: (__, args) => {
            let result = ''
            if (args.x && args.y) {
                return (result = `Results : ${args.x + args.y}`)
            } else {
                return (result = 'All arguments must be provided')
            }
        },
        grade: (parent, arg, ctx, info) => {
            return [12, 56, 99, 95]
        },
        sumArray: (parent, arg, ctx, info) => {
            if (arg.numArray.length === 0) {
                return 0
            } else {
                let result = arg.numArray.reduce((acc, curr) => acc + curr, 0)
                return result
            }
        },
        people: (parent, arg, ctx, info) => {
            if (!arg.search) {
                return peoplesData
            }
            return peoplesData.filter((user) => {
                return user.name.toLowerCase().includes(arg.search.toLowerCase())
            })
        },
        BlogsPost: (__, arg) => {
            if (!arg.search) {
                return blogsData
            }
            return blogsData.filter((blog) => {
                return (
                    blog.title.toLowerCase().includes(arg.search.toLowerCase()) ||
                    blog.body.toLowerCase().includes(arg.search.toLowerCase())
                )
            })
        },
        comments: () => {
            return CommentData
        },
    },
    Blogs: {
        author: (parent, arg, ctx, info) => {
            return peoplesData.find((user) => {
                return user.id === parent.author
            })
        },
    },
    People: {
        posts: (parent, arg, ctx, info) =>
            blogsData.filter((post) => {
                return post.author === parent.id
            }),
    },

    // With Scala Type => Boolean, String, ID, Int and Float
    Query_with_scala: {
        id: () => 12,
        name: () => 'LyhourChhen',
        age: () => 19,
        employment: () => true,
        salary: () => 333.33,
    },
}

// -------------------------------
const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

server.start(() => {
    console.log('Server is up !')
})
