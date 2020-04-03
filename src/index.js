import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import db from './db'

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
                return ctx.db.peoplesData
            }
            return ctx.db.peoplesData.filter((user) => {
                return user.name.toLowerCase().includes(arg.search.toLowerCase())
            })
        },
        BlogsPost: (__, arg) => {
            if (!arg.search) {
                return ctx.db.blogsData
            }
            return ctx.db.blogsData.filter((blog) => {
                return (
                    blog.title.toLowerCase().includes(arg.search.toLowerCase()) ||
                    blog.body.toLowerCase().includes(arg.search.toLowerCase())
                )
            })
        },
        comments: () => {
            return ctx.db.commentData
        },
    },
    Mutation: {
        createUser: (parent, args, ctx, info) => {
            const emailTaken = ctx.db.peoplesData.some(
                (email) => email.email === args.data.email,
            )
            if (emailTaken) {
                throw new Error('Email is taken')
            }
            const user = {
                ...args.data,
                id: uuidv4(),
            }

            ctx.db.peoplesData.push(user)
            return user
        },
        createPost: (parent, arg, ctx, info) => {
            // check user found
            const foundUser = ctx.db.blogsData.some((blog) => {
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
            ctx.db.blogsData.push(post)
            return post
        },
        createComment: (parent, arg, ctx, info) => {
            const userExist = ctx.db.peoplesData.some(
                (user) => user.id === arg.author,
            )
            const postExist = ctx.db.blogsData.some(
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
            ctx.db.commentData.push(comment)
            return comment
        },
        deleteUser: (parent, args, ctx, info) => {
            // Find index of ID
            const userIndex = ctx.db.peoplesData.findIndex((user) => {
                return user.id === args.id
            })
            // findIndex if not true will return -1
            if (userIndex === -1) {
                throw new Error('user not found!')
            }
            const deleteUser = ctx.db.peoplesData.splice(userIndex, 1)

            ctx.db.blogsData.filter((post) => {
                const match = user.id === arg.id
                if (match) {
                    commentData.filter((comment) => comment.postId !== post.id)
                }
                return !match
            })
            ctx.db.commentData.filter((comment) => comment.author !== args.id)
            return deleteUser[0]
        },
        deletePost: (parent, args, ctx, info) => {
            const postIndex = ctx.db.blogsData.findIndex((post) => {
                return post.id === args.id
            })
            if (postIndex === -1) {
                throw new Error('post not found')
            }
            // delete process

            const deletePost = ctx.db.blogsData.splice(postIndex, 1)
            ctx.db.commentData.filter((comment) => comment.postId === args.id)
            return deletePost[0]
        },
        deleteComment: (__, args) => {
            // check comment have or not
            const foundComment = ctx.db.commentData.some((comment) => {
                comment.id === args.id
            })
            if (!foundComment) {
                throw new Error('Error!!, Comment not found dude, pls try again')
            }
            const deleteComment = ctx.db.commentData.filter((comment) => {
                comment.id === args.id
            })
            ctx.db.commentData.filter((comment) => {
                comment.id === args.id
            })
            return deleteComment
        },
    },

    Blogs: {
        author: (parent, arg, ctx, info) => {
            return ctx.db.peoplesData.find((user) => {
                return user.id === parent.author
            })
        },
        comments: () => (parent) => {
            return ctx.db.commentData.filter((comm) => {
                return comm.postId === parent.comments
            })
        },
    },
    People: {
        posts: (parent, arg, ctx, info) =>
            ctx.db.blogsData.filter((post) => {
                return post.author === parent.id
            }),
        comments: (parent, arg, ctx, info) =>
            ctx.db.comments.filter((com) => {
                return com.author === parent.id
            }),
    },
    Comment: {
        author: (parent) => {
            return ctx.db.peoplesData.find((user) => {
                return user.id === parent.author
            })
        },
        posts: (parent) => {
            return ctx.db.blogsData.find((post) => {
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
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    context: {
        db,
    },
})

server.start(() => {
    console.log('Server is up !')
})
