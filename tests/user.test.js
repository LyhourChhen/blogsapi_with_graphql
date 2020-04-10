import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import bcrypt from 'bcryptjs'

const client = new ApolloBoost({
    uri: 'http://localhost:4000',
})

beforeEach(async () => {
    await prisma.mutation.deleteManyPost()
    await prisma.mutation.deleteManyUsers()
    const user = await prisma.mutation.createUser({
        data: {
            name: 'Lyhour',
            email: 'hjaha@gmail.com',
            password: bcrypt.hashSync('Cambodia@123'),
        },
    })
    await prisma.mutation.createPost({
        data: {
            title: 'My publish post',
            body: '',
            published: true,
            author: {
                connect: {
                    id: user.id,
                },
            },
        },
    })
})

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "chhenlyhour"
                    email: "jong@mple.com"
                    password: "MyPass12sss3"
                }
            ) {
                token
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({
        mutation: createUser,
    })

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)
})

test('should expose public author profile', async () => {
    const getUsers = gql`
        query {
            users {
                id
                email
                email
            }
        }
    `
    const res = await client.query({
        query: getUsers,
    })

    expect(res.data.users.length).toBe(1)
    expect(res.data.users[0].email).toBe(null)
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
