import { Schema, model } from 'mongoose'
import { ArtTypeModel } from '../../models/art-type-model'
import { TableNames } from './table-names'
import { ArtTypeColumns } from './art-type-columns'

const artTypeSchema = new Schema<ArtTypeModel>({
    [ArtTypeColumns.name]: {
        type: String,
        required: true
    }
})

const ArtType = model<ArtTypeModel>(TableNames.artTypes, artTypeSchema)

export default ArtType
