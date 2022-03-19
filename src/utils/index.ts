import crypto from 'crypto'

export const utils = {
    toBoolean: (str: string): boolean => {
        return str === 'true'
    },
    generateRandomString: (): string => {
        return crypto.randomBytes(16).toString('base64')
    }
}
