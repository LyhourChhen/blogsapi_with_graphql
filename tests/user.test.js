import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: 'http://localhost:4000',
})

test('should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "LyhourChhen"
                    email: "chhenlyhour1sssss@gmail.com"
                    password: "Cambodia@123"
                }
            ) {
                token
                user {
                    id
                    name
                    email
                }
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser,
    }).then
})

// import { getFirstName, validatePassword } from '../src/utils/user'
// // first test
// test('should render out', () => {
//     console.log('haha')
// })

// // render the first name only

// test('should get only firstName', () => {
//     const firstName = getFirstName('Lyhour Chhen')

//     // manually approach
//     // if (firstName !== 'Lyhour') {
//     //     throw new Error('Expected name Lyhour')
//     // }

//     // with expect method from jest
//     expect(firstName).toBe('Lyhour')
// })

// test('should reject password when length less than 8 ', () => {
//     const valid = validatePassword('9se38')

//     expect(valid).toBe(false)
// })

// test('should reject that password is contain the word => password', () => {
//     const valid = validatePassword('passwsord')
//     expect(valid).toBe(true)
// })
