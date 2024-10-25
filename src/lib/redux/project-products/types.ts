import { type Product } from '../products/types';
import { type Project } from '../project/types';

export interface ProjectProductListResponse {
    projectProductList: ProjectProductList;
}

interface ProjectProductList {
    projectProducts: ProjectProduct[];
    hasMore: boolean;
}

export interface ProjectProductInputs {
    project?: string;
    product?: string;
    quantity?: number;
    status?: string;
    uuid?: string;
}

export interface ProjectProduct {
    uuid: string;
    project: Project;
    product: Product;
    quantity: number;
    status: string;
    allocated: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    deleted: boolean;
    deletedAt: string;
    deletedBy: string;
    deletedReason: string;
    deletedNote: string;
}
