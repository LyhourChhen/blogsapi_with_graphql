const Comment = {
    author: (parent, args, ctx, info) => {
        return ctx.db.peoplesData.find((user) => {
            return user.id === parent.author
        })
    },
    posts: (parent, args, ctx, info) => {
        return ctx.db.blogsData.find((post) => {
            return post.author === parent.id
        })
    },
}

export default Comment
