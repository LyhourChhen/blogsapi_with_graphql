import getUserId from '../utils/getUserId'
const User = {
    // posts(parent, args, { db }, info) {
    //     return db.posts.filter((post) => {
    //         return post.author === parent.id
    //     })
    // },
    // comments(parent, args, { db }, info) {
    //     return db.comments.filter((comment) => {
    //         return comment.author === parent.id
    //     })
    // },
    email: (parent, args, { prisma, request }) => {
        const authUserId = getUserId(request, false)
        if (authUserId && authUserId === parent.id) {
            return parent.email
        } else {
            return null
        }
    },
}

export { User as default }
