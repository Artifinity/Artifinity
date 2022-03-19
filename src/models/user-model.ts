import { BaseModel } from './base-model'

export interface UserModel extends BaseModel {
    firstName?: string;
    lastName?: string;
    bio?: string;
    address: string;
    portfolioUrl?: string;
    nonce: string;
}
