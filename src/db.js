// To be note all id should be string now !
let peoplesData = [
    {
        id: '0',
        name: 'Vicka',
        age: 19,
        email: 'laoVicheka@gmail.com',
    },
    {
        id: '1',
        name: 'Roth',
        age: 20,
        email: 'jonhSom@gmail.com',
    },
    {
        id: '2',
        name: 'Lihour',
        age: 19,
        email: 'nana@gmail.com',
    },
]

let blogsData = [
    {
        id: '0',
        title: 'How to make love <3',
        body:
            "Foreplay is important. Remember that love making starts before the sex part, so don't discount the foreplay phase",
        published: true,
        author: '0',
    },
    {
        id: '1',
        title: 'Learn GraphQL faster with Lyhour',
        body:
            'GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.',
        published: true,
        author: '2',
    },
    {
        id: '2',
        title: 'What is python ?',
        body:
            "Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace.",
        published: true,
        author: '1',
    },
]

let commentData = [
    {
        id: '123342',
        text: 'I love you',
        author: '1',
        postId: '1',
    },
    {
        id: '223423',
        text: 'boi you should to die now',
        author: '1',
        postId: '2',
    },
    {
        id: '332423',
        text: 'Mother fucker bullshit',
        author: '1',
        postId: '3',
    },
    {
        id: '4234',
        text: 'Dam mother fucker',
        author: '2',
        postId: '1',
    },
]

const db = {
    peoplesData,
    blogsData,
    commentData,
}
export { db as default }
