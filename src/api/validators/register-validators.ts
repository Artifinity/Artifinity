import { body, ValidationChain } from 'express-validator'
import { UserColumns } from '../../data/models/user-columns'

export const RegisterValidators: ValidationChain[] = [
    body(UserColumns.firstName).isLength({
        min: 2,
        max: 50
    }),
    body(UserColumns.lastName).isLength({
        min: 2,
        max: 50
    })
]
