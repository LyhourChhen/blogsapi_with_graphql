import { GraphQLServer } from 'graphql-yoga'

// Type Definition || Schema (This is where our structure should look like)
// ! => It required field && if noting it will return null

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String
        me: User!
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
`

// Resolvers => The function where where schema need to be performs

const resolvers = {
    //This must be match with type
    Query: {
        hello: () => 'This is my First GraphQL Query',
        name: () => 'LyhourChhen',
        location: () => 'I love in PhnomPenh, City of 🇰🇭',
        bio: () =>
            'My name is LyhourChhen and i am also the software engineer who currently working with Frontend-Developments',
        me() {
            return {
                id: 1,
                name: 'LyhourChhen',
                password: 123456,
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
