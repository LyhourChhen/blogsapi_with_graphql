const People = {
    posts: (parent, arg, ctx, info) =>
        ctx.db.blogsData.filter((post) => {
            return post.author === parent.id
        }),
    comments: (parent, arg, ctx, info) =>
        ctx.db.comments.filter((com) => {
            return com.author === parent.id
        }),
}
export default People
