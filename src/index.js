import { GraphQLServer } from 'graphql-yoga'
import colors from 'colors'
import db from './db'
// resolver
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Blogs from './resolvers/Blogs'
import People from './resolvers/People'
import Comment from './resolvers/Comment'

// -------------------------------
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Blogs,
        People,
        Comment,
    },
    context: {
        db,
    },
})

server.start(() => {
    console.log(
        `Server is up on port ${colors.blue('=>')} ${colors.red(
            'http://localhost:4000',
        )} ${colors.blue('<=')}`,
    )
})
