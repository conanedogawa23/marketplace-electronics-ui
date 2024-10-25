import { type Status } from '../types';

export interface RoleListResponse {
    roleList: Role[];
}

export interface Role {
    _id: string;
    name: string;
    uuid: string;
    createdBy: string;
    updatedBy: null;
    status: Status;
    createdAt: string;
    updatedAt: string;
}
