export interface Department {
    _id: string;
    createdAt: string;
    createdBy: null;
    deleted: boolean;
    deletedAt: null;
    deletedBy: null;
    deletedNote: null;
    deletedReason: null;
    description: string;
    name: string;
    status: string;
    updatedAt: string;
    updatedBy: null;
    uuid: string;
}
export interface GetDepartmentListResponse {
    departmentList: DepartmentList;
}

export interface DepartmentList {
    departments: Department[];
    hasMore: boolean;
}
