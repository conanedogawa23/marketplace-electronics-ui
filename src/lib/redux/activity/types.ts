import { type Product , type SerializedProduct } from "../products/types";
import { type Location } from "../locations/types";
import { type ProjectProduct } from "../project-products/types";

export type ActivityLogListResponse = {
    activityLogList: ActivityLogList;
};

interface ActivityLogList {
    activityLogs: ActivityLog[];
    hasMore: boolean;
}

export type ActivityLogResponse = {
    activityLog: ActivityLog;
};

interface ActivityLogTrackInput {
    product: string;
    quantity?: number;
    deleteSerialNumbers?: boolean;
    serialNumbers?: string[];
    fromLocation?: string;
    toLocation?: string;
    project?: string;
}

export type ActivityLogInputs = {
    project?: string;
    uuid?: string;
    type: string;
    description?: string;
    name?: string;
    status?: string;
    track: ActivityLogTrackInput[];
    activityId: string;
    note?: string;
    warehouse?: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    deletedNote?: string;
    deletedReason?: string;
};

export type ActivityLog = {
    createActivityLog: any;
    uuid: string;
    description: string;
    activityId: string;
    project: string;
    name: string;
    type: string;
    note: string;
    status: string;
    warehouse: string;
    track: ActivityLogTrackInput[];
    createdAt: string;
    createdBy: string;
    deleted: boolean;
    deletedAt: string;
    deletedBy: string;
    deletedNote: string;
    deletedReason: string;
    updatedAt: string;
    updatedBy: string;
};

export type ActivityLogDetail = {
    uuid: string;
    type: string;
    activityId: string;
    products: Product[];
    fromLocation: Location[];
    toLocation: Location;
    serialNumbers: SerializedProduct[];
    projectProducts: ProjectProduct[];
    track: ActivityLogTrackInput[];
    createdAt: string;
    createdBy: string;
    deleted: boolean;
    deletedAt: string;
    deletedBy: string;
    deletedNote: string;
    deletedReason: string;
    description: string;
    updatedAt: string;
    updatedBy: string;
};

export type ActivityLogDetailResponse = {
    activityLogDetails: ActivityLogDetail;
}

export type ActivityLogDetailsListResponse = {
    activityLogDetailsListAdjust: {
        activityLogDetails: ActivityLogDetail[];
        hasMore: boolean;
    }
}