const Blogs = {
    author: (parent, arg, ctx, info) => {
        return ctx.db.peoplesData.find((user) => {
            return user.id === parent.author
        })
    },
    comments: () => (parent, args, ctx, info) => {
        return ctx.db.commentData.filter((comm) => {
            return comm.postId === parent.comments
        })
    },
}

export default Blogs
