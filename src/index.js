import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import {
    data as peoplesData,
    blogs as blogsData,
    comments as commentData,
    comments,
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
    
    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!    
        createPost(title: String!, body: String!, published: Boolean!, author: String! ): Blogs!
        createComment(text: String!, author: ID!, post: ID!): Comment!
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
        email: String
        age: Int
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
        comments: [Comment!]!
    }
    type Blogs { 
        id: ID!
        title : String!
        body : String!
        published: Boolean!
        author: People!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
        author: String !
        posts: Blogs!
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
            return commentData
        },
    },
    Mutation: {
        createUser: (parent, arg, ctx, info) => {
            const emailTaken = peoplesData.some((email) => email.email === arg.email)
            if (emailTaken) {
                throw new Error('Email is taken')
            }
            const user = {
                id: uuidv4(),
                name: arg.name,
                email: arg.email,
                age: arg.age,
            }

            peoplesData.push(user)
            return user
        },
        createPost: (parent, arg, ctx, info) => {
            // check weather user found
            const foundUser = blogsData.some((blog) => {
                blog.id === arg.author
            })
            if (!foundUser) {
                throw new Error('User/Author Not found!')
            }
            const post = {
                id: uuidv4(),
                title: arg.title,
                body: arg.body,
                published: arg.published,
                author: arg.author,
            }
            blogsData.push(post)
            return post
        },
        createComment: (parent, arg, ctx, info) => {
            const userExist = peoplesData.some((user) => user.id === arg.author)
            const postExist = blogsData.some(
                (post) => post.id === arg.post && post.published,
            )
            if (!userExist || !postExist) {
                throw new Error("Can't even find the user and post!")
            }
            const comment = {
                id: uuidv4(),
                text: arg.text,
                author: arg.author,
                post: arg.post,
            }
            commentData.push(comment)
            return comment
        },
    },

    Blogs: {
        author: (parent, arg, ctx, info) => {
            return peoplesData.find((user) => {
                return user.id === parent.author
            })
        },
        comments: () => (parent) => {
            return commentData.filter((comm) => {
                return comm.postId === parent.comments
            })
        },
    },
    People: {
        posts: (parent, arg, ctx, info) =>
            blogsData.filter((post) => {
                return post.author === parent.id
            }),
        comments: (parent, arg, ctx, info) =>
            comments.filter((com) => {
                return com.author === parent.id
            }),
    },
    Comment: {
        author: (parent) => {
            return peoplesData.find((user) => {
                return user.id === parent.author
            })
        },
        posts: (parent) => {
            return blogsData.find((post) => {
                return post.author === parent.id
            })
        },
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
