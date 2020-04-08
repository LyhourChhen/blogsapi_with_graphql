import getUserId from '../utils/getUserId'
const Query = {
    users(parent, args, { db, prisma }, info) {
        // before connect with prisma server
        // if (!args.query) {
        //     return db.users
        // }

        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })

        // connected
        const opArgs = {}
        if (args.query) {
            opArgs.where = {
                // single
                // name_contains: args.query,
                // with multiple logic
                OR: [
                    {
                        name_contains: args.query,
                    },
                    {
                        email_contains: args.query,
                    },
                ],
            }
        }
        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, { db, prisma }, info) {
        // if (!args.query) {
        //     return db.posts
        // }

        // return db.posts.filter((post) => {
        //     const isTitleMatch = post.title
        //         .toLowerCase()
        //         .includes(args.query.toLowerCase())
        //     const isBodyMatch = post.body
        //         .toLowerCase()
        //         .includes(args.query.toLowerCase())
        //     return isTitleMatch || isBodyMatch
        // })

        // After Connected
        const opArgs = {}
        if (args.query) {
            opArgs.where = {
                OR: [
                    {
                        email_contains: args.query,
                    },
                    {
                        email_contains: args.query,
                    },
                ],
            }
        }
        return prisma.query.posts(null, info)
    },
    comments(parent, args, { db }, info) {
        return db.comments
    },
    async me(parent, args, { prisma, request }, info) {
        const AuthUserId = await getUserId(request)
        return prisma.query.user(
            {
                where: {
                    id: AuthUserId,
                },
            },
            info,
        )
    },
    async post(parent, args, { prisma, request }, info) {
        const AuthUserId = await getUserId(request, false)
        const posts = await prisma.query.posts(
            {
                where: {
                    id: args.id,
                    OR: [
                        {
                            published: true,
                        },
                        {
                            author: {
                                id: AuthUserId,
                            },
                        },
                    ],
                },
            },
            info,
        )
        if (posts.length === 0) {
            throw new Error('Posts not found')
        }
        return posts[0]
    },
}

export { Query as default }
