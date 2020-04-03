import uuidv4 from 'uuid/v4'
import colors from 'colors'
const Mutation = {
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
    createPost: (parent, args, ctx, info) => {
        // check user found
        const foundUser = ctx.db.blogsData.some((blog) => {
            return blog.id === args.author
        })
        console.log('after check user', colors.red(foundUser))
        if (!foundUser) {
            throw new Error('User/Author Not found!')
        }
        const post = {
            id: uuidv4(),
            title: args.title,
            body: args.body,
            published: args.published,
            author: args.author,
        }
        ctx.db.blogsData.push(post)

        if (args.published === true) {
            console.log('post data', colors.red(post))
            ctx.pubsub.publish('post', { post })
        }

        return post
    },
    createComment: (parent, args, ctx, info) => {
        console.log('render log', args)
        const { pubsub } = ctx
        const userExist = ctx.db.peoplesData.some((user) => user.id == args.author) //maybe wrong type
        const postExist = ctx.db.blogsData.some(
            (post) => post.id == args.post && post.published,
        )
        console.log(
            'check both user and post',
            colors.red(userExist),
            colors.green(postExist),
        )
        if (!userExist || !postExist) {
            throw new Error("Can't even find the user and post!")
        }
        const comment = {
            id: uuidv4(),
            text: args.text,
            author: args.author,
            post: args.post,
        }
        ctx.db.commentData.push(comment)

        // Subscription
        pubsub.publish(`comment ${args.post}`, {
            id: uuidv4(),
            text: args.text,
            author: args.author,
            post: args.post,
        })
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
    deleteComment: (parent, args, ctx, info) => {
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
    updateUser: (parent, args, ctx, info) => {
        // checking user exist
        const user = ctx.db.peoplesData.find((user) => user.id === args.id)
        if (user === undefined || user === null) {
            throw new Error('user not found')
        }
        // checking email
        if (typeof args.data.email === 'string') {
            const emailTaken = ctx.db.peoplesData.some(
                (user) => user.email === args.data.email,
            )
            if (emailTaken) {
                throw new Error('Email is in used / taken')
            }
            user.email = args.data.email
        }
        // checking age
        if (typeof args.data.age !== 'undefined') {
            user.age = args.data.age
        }
        // change name
        if (typeof args.data.name !== null || typeof args.data.name !== undefined) {
            user.name = args.data.name
        }
        return user
    },
    updateBlogs: (parent, args, ctx, info) => {
        // check post is exist ?
        const checkPost = ctx.db.blogsData.find((post) => {
            return post.id === args.id
        })
        console.log('checkpost output', colors.red(checkPost))
        if (checkPost === undefined || checkPost === null) {
            throw new Error("Your blog isn't exist, please try different Id")
        }
        // check null || undefined
        if (typeof args.data.title === 'string') {
            checkPost.title === args.data.title
        }
        if (typeof args.data.title === 'string') {
            checkPost.body === args.data.body
        }
        if (typeof args.data.title === 'boolean') {
            checkPost.published === args.data.published
        }
        return checkPost
    },
}

export default Mutation
