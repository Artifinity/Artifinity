import { BaseModel } from './base-model'
import { ObjectId } from 'mongodb';

export interface ProjectModel extends BaseModel {
    name: string;
    description: string;
    tags: string[];
    url: string;
    imageUrl: string;
    createdOn?: Date;
    endDate: Date;
    owner: ObjectId | string;
}
