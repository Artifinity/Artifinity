import { BaseModel } from './base-model'
import { ObjectId } from 'mongodb'

export interface ProjectModel extends BaseModel {
    name: string;
    description: string;
    tags: string[];
    url: string;
    imageUrl: string;
    createdOn?: Date;
    endDate: Date;
    owner: ObjectId | string;
    contractId: string;
    campaignId: string;
    tokenId: string;
    targetSum: number;
    raisedSum?: number;
    perks: PerkModel[];
    isCompleted?: boolean;
}

export interface PerkModel {
    price: number;
    name: string;
    description: string;
}
