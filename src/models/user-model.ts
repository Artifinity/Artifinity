import { BaseModel } from './base-model'

export interface UserModel extends BaseModel {
    firstName?: string;
    lastName?: string;
    address: string;
    nonce: string;
    avatar?: string;
    coverPhoto?: string;
    youTubeUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
}
