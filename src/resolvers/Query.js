const Query = {
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
    add: (parent, args, ctx, info) => {
        let result = ''
        if (args.x && args.y) {
            return (result = `Results : ${args.x + args.y}`)
        } else {
            return (result = 'All arguments must be provided')
        }
    },
    grade: (parent, args, ctx, info) => {
        return [12, 56, 99, 95]
    },
    sumArray: (parent, args, ctx, info) => {
        if (args.numArray.length === 0) {
            return 0
        } else {
            let result = args.numArray.reduce((acc, curr) => acc + curr, 0)
            return result
        }
    },
    people: (parent, args, ctx, info) => {
        if (!args.search) {
            return ctx.db.peoplesData
        }
        return ctx.db.peoplesData.filter((user) => {
            return user.name.toLowerCase().includes(args.search.toLowerCase())
        })
    },
    BlogsPost: (parent, args, ctx, info) => {
        if (!args.search) {
            return ctx.db.blogsData
        }
        return ctx.db.blogsData.filter((blog) => {
            return (
                blog.title.toLowerCase().includes(arg.search.toLowerCase()) ||
                blog.body.toLowerCase().includes(arg.search.toLowerCase())
            )
        })
    },
    comments: (parent, args, ctx, info) => {
        return ctx.db.commentData
    },
    // Query with Scala
    // Query_with_scala: {
    //     id: () => 12,
    //     name: () => 'LyhourChhen',
    //     age: () => 19,
    //     employment: () => true,
    //     salary: () => 333.33,
    // },
}

export default Query
