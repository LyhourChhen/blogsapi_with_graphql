import bscript from 'bcryptjs'
import colors from 'colors'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'
// testing JWT
// const token = jwt.sign({ id: 66 }, 'thesecretcode')
// console.log('output the token: ', colors.red(token))
// const decode = jwt.decode(token)
// const decodeWithVerify = jwt.verify(token, 'thesecretcode')
// console.log(
//     'output the decond token: ',
//     colors.green(decode),
//     colors.white(decodeWithVerify),
// )

const Mutation = {
    createUser: async (parent, args, { db, prisma }, info) => {
        // const emailTaken = db.users.some((user) => user.email === args.data.email)
        // if (emailTaken) {
        //     throw new Error('Email taken')
        // }
        // const user = {
        //     id: uuidv4(),
        //     ...args.data,
        // }
        // db.users.push(user)
        // return user

        // check exist

        // check password
        // Take in password -> Validate Password -> Hash Password -> Generate auth token
        // console.log('console prisma', colors.blue(prisma))

        const password = await hashPassword(args.data.password)

        const emailTaken = await prisma.exists.User({
            email: args.data.email,
        })
        console.log('console out email taken', colors.red(emailTaken))
        if (emailTaken) {
            throw new Error('Email is taken')
        }
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password: password,
            },
        })
        console.log('did i revieve user', user.id)
        return {
            user,
            token: generateToken(user.id),
        }
    },

    login: async (parent, args, { prisma }, info) => {
        const user = await prisma.query.user({
            where: {
                email: args.data.email,
            },
        })
        if (!user) {
            throw new Error('we unable to found your email & username')
        }
        console.log('getting user & password from it', user, user.password)
        const isMatch = await bscript.compare(args.data.password, user.password)
        if (!isMatch) {
            throw new Error('we unable to found your password !')
        }

        return {
            user,
            token: generateToken(user.id),
        }
    },

    async deleteUser(parent, args, { db, prisma, request }, info) {
        const AuthUserId = getUserId(request)
        // const userIndex = db.users.findIndex((user) => user.id === args.id)
        // if (userIndex === -1) {
        //     throw new Error('User not found')
        // }
        // const deletedUsers = db.users.splice(userIndex, 1)
        // db.posts = db.posts.filter((post) => {
        //     const match = post.author === args.id
        //     if (match) {
        //         db.comments = db.comments.filter(
        //             (comment) => comment.post !== post.id,
        //         )
        //     }
        //     return !match
        // })
        // db.comments = db.comments.filter((comment) => comment.author !== args.id)
        // return deletedUsers[0]
        // check user exist
        const existUser = await prisma.exists.User({
            id: args.id,
        })
        if (!existUser) {
            throw new Error('User not found')
        }
        return prisma.mutation.deleteUser(
            {
                where: {
                    id: AuthUserId,
                },
            },
            info,
        )
    },
    updateUser(parent, args, { db, prisma, request }, info) {
        const AuthUserId = getUserId(request)
        //     const { id, data } = args
        //     const user = db.users.find((user) => user.id === id)
        //     if (!user) {
        //         throw new Error('User not found')
        //     }
        //     if (typeof data.email === 'string') {
        //         const emailTaken = db.users.some((user) => user.email === data.email)
        //         if (emailTaken) {
        //             throw new Error('Email taken')
        //         }
        //         user.email = data.email
        //     }
        //     if (typeof data.name === 'string') {
        //         user.name = data.name
        //     }
        //     if (typeof data.age !== 'undefined') {
        //         user.age = data.age
        //     }
        //     return user
        // },

        if (typeof args.data.password === 'string') {
            args.data.password = hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser(
            {
                where: {
                    id: AuthUserId,
                },
                data: args.data,
            },
            info,
        )
    },
    async createPost(parent, args, { db, pubsub, prisma, request }, info) {
        const AuthUserId = getUserId(request)
        // const userExists = db.users.some((user) => user.id === args.data.author)
        // if (!userExists) {
        //     throw new Error('User not found')
        // }
        // const post = {
        //     id: uuidv4(),
        //     ...args.data,
        // }
        // db.posts.push(post)
        // if (args.data.published) {
        //     pubsub.publish('post', {
        //         post: {
        //             mutation: 'CREATED',
        //             data: post,
        //         },
        //     })
        // }
        // return post

        // check user if exist or note

        console.log('args output', colors.blue(args))
        const data = await prisma.mutation.createPost(
            {
                data: {
                    title: args.data.title,
                    body: args.data.body,
                    published: args.data.published,
                    author: {
                        connect: {
                            id: AuthUserId,
                        },
                    },
                },
            },
            info,
        )
        console.log('data output', colors.red(data))
        return data
    },
    async deletePost(parent, args, { db, pubsub, prisma, request }, info) {
        // const postIndex = db.posts.findIndex((post) => post.id === args.id)

        // if (postIndex === -1) {
        //     throw new Error('Post not found')
        // }

        // const [post] = db.posts.splice(postIndex, 1)

        // db.comments = db.comments.filter((comment) => comment.post !== args.id)

        // if (post.published) {
        //     pubsub.publish('post', {
        //         post: {
        //             mutation: 'DELETED',
        //             data: post,
        //         },
        //     })
        // }

        // return post
        // -------

        const AuthUserId = getUserId(request)
        const postExist = await prisma.exists.Post({
            id: args.id,
            author: {
                id: AuthUserId,
            },
        })
        if (!postExist) {
            throw new Error('Unable to delete post')
        }

        return prisma.mutation.deletePost(
            {
                where: {
                    id: args.id,
                },
            },
            info,
        )
    },
    async updatePost(parent, args, { db, pubsub, prisma, request }, info) {
        // const { id, data } = args
        // const post = db.posts.find((post) => post.id === id)
        // const originalPost = { ...post }

        // if (!post) {
        //     throw new Error('Post not found')
        // }

        // if (typeof data.title === 'string') {
        //     post.title = data.title
        // }

        // if (typeof data.body === 'string') {
        //     post.body = data.body
        // }

        // if (typeof data.published === 'boolean') {
        //     post.published = data.published

        //     if (originalPost.published && !post.published) {
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'DELETED',
        //                 data: originalPost,
        //             },
        //         })
        //     } else if (!originalPost.published && post.published) {
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'CREATED',
        //                 data: post,
        //             },
        //         })
        //     }
        // } else if (post.published) {
        //     pubsub.publish('post', {
        //         post: {
        //             mutation: 'UPDATED',
        //             data: post,
        //         },
        //     })
        // }

        // return post
        // ----
        const AuthUserId = await getUserId(request)
        const checkPostExist = await prisma.exists.Post({
            id: args.id,
            author: {
                id: AuthUserId,
            },
        })

        const publishedPost = await prisma.exists.Post({
            id: args.id,
            published: true,
        })
        if (!checkPostExist) {
            throw new Error('unable to update your post')
        }
        if (publishedPost && args.data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id,
                    },
                },
            })
        }

        return prisma.mutation.updatePost(
            {
                where: {
                    id: args.id,
                },
                data: args.data,
            },
            info,
        )
    },
    async createComment(parent, args, { db, pubsub, prisma, request }, info) {
        // const userExists = db.users.some((user) => user.id === args.data.author)
        // const postExists = db.posts.some(
        //     (post) => post.id === args.data.post && post.published,
        // )

        // if (!userExists || !postExists) {
        //     throw new Error('Unable to find user and post')
        // }

        // const comment = {
        //     id: uuidv4(),
        //     ...args.data,
        // }

        // db.comments.push(comment)
        // pubsub.publish(`comment ${args.data.post}`, {
        //     comment: {
        //         mutation: 'CREATED',
        //         data: comment,
        //     },
        // })

        // return comment
        const AuthUserId = await getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.data.post,
            published: true,
        })
        if (!postExists) {
            throw new Error('unable to find posts')
        }
        return prisma.mutation.createComment(
            {
                data: {
                    text: args.data.text,
                    author: {
                        connect: {
                            id: AuthUserId,
                        },
                    },
                    post: {
                        connect: {
                            id: args.data.post,
                        },
                    },
                },
            },
            info,
        )
    },
    async deleteComment(parent, args, { db, pubsub, prisma, request }, info) {
        // const commentIndex = db.comments.findIndex(
        //     (comment) => comment.id === args.id,
        // )

        // if (commentIndex === -1) {
        //     throw new Error('Comment not found')
        // }

        // const [deletedComment] = db.comments.splice(commentIndex, 1)
        // pubsub.publish(`comment ${deletedComment.post}`, {
        //     comment: {
        //         mutation: 'DELETED',
        //         data: deletedComment,
        //     },
        // })

        // return deletedComment
        const AuthUserId = await getUserId(request)

        const existComment = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: AuthUserId,
            },
        })
        if (existComment !== true) {
            throw new Error('unable to delete the comment')
        }

        return prisma.mutation.deleteComment(
            {
                where: {
                    id: args.id,
                },
            },
            info,
        )
    },
    async updateComment(parent, args, { db, pubsub, prisma, request }, info) {
        // const { id, data } = args
        // const comment = db.comments.find((comment) => comment.id === id)

        // if (!comment) {
        //     throw new Error('Comment not found')
        // }

        // if (typeof data.text === 'string') {
        //     comment.text = data.text
        // }

        // pubsub.publish(`comment ${comment.post}`, {
        //     comment: {
        //         mutation: 'UPDATED',
        //         data: comment,
        //     },
        // })

        // return comment
        const AuthUserId = getUserId(request)
        const existComment = prisma.exists.Comment({
            id: args.id,
            author: {
                id: AuthUserId,
            },
        })
        if (!existComment) {
            throw new Error('Comment not found!')
        }

        return prisma.mutation.updateComment(
            {
                data: args.data,
                where: {
                    id: args.id,
                },
            },
            info,
        )
    },
}

export { Mutation as default }
