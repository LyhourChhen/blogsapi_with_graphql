import uuidv4 from 'uuid/v4'
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
            blog.id === arg.author
        })
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
        return post
    },
    createComment: (parent, args, ctx, info) => {
        const userExist = ctx.db.peoplesData.some((user) => user.id === arg.author)
        const postExist = ctx.db.blogsData.some(
            (post) => post.id === args.post && post.published,
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
}

export default Mutation
