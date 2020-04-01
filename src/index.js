import { GraphQLServer } from 'graphql-yoga'

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
