import { GraphQLServer, PubSub } from 'graphql-yoga'
import colors from 'colors'
import db from './db'
import prisma from './prisma'
import { resolvers, fragmentReplacements } from './resolvers/index'
const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    context: (request) => {
        return { db, pubsub, prisma, request }
    },
    fragmentReplacements,
})

server.start(() => {
    console.log(
        `Server is running on port ${colors.blue('=>')} ${colors.red(
            'http://localhost:4000',
        )} ${colors.blue('<=')} & Prisma : ${colors.green('http://localhost:4466')}`,
    )
})
