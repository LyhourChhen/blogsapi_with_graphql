export const getFirstName = (fullName) => {
    let split = fullName.split(' ')
    return split[0]
}

export const validatePassword = (password) => {
    return password.length >= 8 && !password.toLowerCase().includes('password')
}
