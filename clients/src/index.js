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

client
    .query({
        query: getUsers,
    })
    .then((res) => {
        console.log('getting data from graphQL', res.data.users)
    })
