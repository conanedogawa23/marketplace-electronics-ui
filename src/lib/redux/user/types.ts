import { type Department } from '../department/types';
import { type Permission } from '../permission/types';
import { type Role } from '../role/types';
import { type Status } from '../types';

export interface User {
    _id: string;
    address: null;
    admin: boolean | null;
    createdAt: string;
    dateOfBirth: string;
    deleted: boolean;
    deletedAt: string | null;
    department: Department;
    email: string;
    employeeId: string;
    employmentStatus: Status;
    firstName: string;
    hireDate: string;
    lastName: string;
    permissions: Permission[];
    phoneNumber: null;
    position: string;
    projects: Department[];
    role: Role;
    salary: number;
    updatedAt: string;
    uuid: string;
}

export interface UserListResponse {
    userList: UserList;
}

interface UserList {
    users: User[];
    hasMore: boolean;
}

export interface DeleteUserResponse {
    deleteUser: User;
}

export interface CreateUserResponse {
    createUser: User;
}

export type CreateUserParams = {
    user: {
        department: string; // department id
        email: string;
        employeeId: string;
        firstName: string;
        lastName: string;
        password?: string;
        permissions: string[]; // permission ids
        phoneNumber: string;
        projects?: string[]; // project ids
        role?: string; // role id

        salary?: number;
        position?: string;
        image: string;
    };
};
