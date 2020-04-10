import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:4000',
})

const getUsers = gql`
    query {
        users {
            name
            id
            email
        }
    }
`

const getPosts = gql`
    query {
        posts {
            id
            title
        }
    }
`

client
    .query({
        query: getUsers,
    })
    .then((res) => {
        console.log('getting data from graphQL', res.data.users)

        let html = ''
        res.data.users.forEach((user) => {
            html += `
                <div>
                    <h3>${user.name}</h3>
                </div
            `
        })
        document.getElementById('users').innerHTML = html
    })

client
    .query({
        query: getPosts,
    })
    .then((res) => {
        console.log('getting response from user with graphQL', res.data.posts)

        let html = ''
        res.data.posts.forEach((post) => {
            html += `
                <div>
                    <p style={{fontWeight: "bold}}>${post.id}</p>
                    <h3>${post.title}</h3>
                </div>
            `
        })
        document.getElementById('posts').innerHTML = html
    })
