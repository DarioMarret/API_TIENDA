import bcrypt from 'bcrypt'

/**
 * 
 * @param {*} password 
 * @returns {string} hash
 */
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

/**
 * 
 * @param {*} password 
 * @param {*} hash 
 * @returns {boolean} isMatch
 */
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}