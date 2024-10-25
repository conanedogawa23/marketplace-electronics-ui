import { type AccessLevel, type Status } from '../types';

export interface PermissionListResponse {
    permissionList: PermissionList[];
}

export interface PermissionList {
    module: string;
    permissions: Permission[];
}

export interface Permission {
    _id: string;
    accessLevel: AccessLevel;
    createdAt: string;
    createdBy: null;
    description: null;
    feature: string;
    module: string;
    name: string;
    status: Status;
    updatedAt: string;
    updatedBy: null;
    uuid: string;
}
