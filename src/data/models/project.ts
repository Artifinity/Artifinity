import { Schema, model } from 'mongoose'
import { TableNames } from './table-names'
import { PerkModel, ProjectModel } from '../../models/project-model'
import { PerkColumns, ProjectColumns } from './project-columns'

const perkSchema = new Schema<PerkModel>({
    [PerkColumns.price]: { type: Number },
    [PerkColumns.name]: { type: String },
    [PerkColumns.description]: { type: String }
})

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
        default: new Date().toUTCString(),
        required: true
    },
    [ProjectColumns.endDate]: {
        type: Date,
        required: true
    },
    [ProjectColumns.campaignId]: {
        type: String,
        required: true
    },
    [ProjectColumns.tokenId]: {
        type: String,
        required: true
    },
    [ProjectColumns.targetSum]: {
        type: Number,
        required: true
    },
    [ProjectColumns.raisedSum]: {
        type: Number,
        default: 0
    },
    [ProjectColumns.perks]: {
        type: [perkSchema]
    }
})

const Project = model<ProjectModel>(TableNames.projects, projectSchema)

export default Project
