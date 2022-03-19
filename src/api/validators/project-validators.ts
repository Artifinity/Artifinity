import { body } from 'express-validator'
import { ProjectColumns } from '../../data/models/project-columns'

export const ProjectValidators = [
    body(ProjectColumns.name).isLength({
        min: 2,
        max: 100
    }),
    body(ProjectColumns.description).isLength({
        min: 4,
        max: 2000
    }),
    body(ProjectColumns.description).isLength({
        min: 5,
        max: 2000
    })
]
