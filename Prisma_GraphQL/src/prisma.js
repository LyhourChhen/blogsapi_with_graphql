import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// There are some common method to use in this project !
// - prisma.query
// - prisma.mutation
// - prisma.subscription
// - prisma.exist => some utility relate with graphql

// ==> test

// prisma.query
//     .users(null, '{id name email}')
//     .then((data) => console.log('return data', data))

// prisma.query.comments(null, '{id text author {id name}}').then((comments) => {
//     console.log(JSON.stringify(comments, null, 2))
// })

// mutation

prisma.mutation
    .createPost(
        {
            data: {
                title: 'Learn graphQL 101',
                body: 'nana this is just a test',
                published: false,
                author: {
                    connect: {
                        id: 'ck8l5p9ii006i07044xqxxhmv',
                    },
                },
            },
        },
        '{id title body published}',
    )
    .then((post) => {
        console.log('data', post)
        return prisma.query.users(null, '{id name  posts {id title}}')
    })
    .then((data) => {
        console.log(JSON.stringify(data, null, 2))
    })
