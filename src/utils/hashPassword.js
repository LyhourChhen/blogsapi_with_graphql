import bscript from 'bcryptjs'

const hashPassword = (getPassword) => {
    if (getPassword.length < 8) {
        throw new Error('Password must be 8 character longer')
    }
    const password = bscript.hash(getPassword, 10)
    return password
}
export default hashPassword
