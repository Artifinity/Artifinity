import { Schema, model } from 'mongoose'
import { TableNames } from './table-names'
import { ProjectModel } from '../../models/project-model'
import { ProjectColumns } from './project-columns'

const projectSchema = new Schema<ProjectModel>({
    [ProjectColumns.name]: {
        type: String,
        required: true
    },
    [ProjectColumns.url]: {
        type: String
    },
    [ProjectColumns.owner]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: TableNames.user
    },
    [ProjectColumns.imageUrl]: {
        type: String
    },
    [ProjectColumns.description]: {
        type: String,
        required: true
    },
    [ProjectColumns.tags]: {
        type: [String]
    },
    [ProjectColumns.createdOn]: {
        type: Date,
        default: Date.now(),
        required: true
    },
    [ProjectColumns.endDate]: {
        type: Date,
        required: true
    }
})

const Project = model<ProjectModel>(TableNames.projects, projectSchema)

export default Project
