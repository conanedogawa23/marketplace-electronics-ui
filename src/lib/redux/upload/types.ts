export interface UploadImageAPIResponse {
    message: string;
    data: Data;
}

export interface Data {
    s3Response: S3Response[];
    uploadedAttachments: string[];
}

export interface S3Response {
    $metadata: Metadata;
    ETag: string;
    ServerSideEncryption: string;
    VersionId: string;
}

export interface Metadata {
    httpStatusCode: number;
    requestId: string;
    extendedRequestId: string;
    attempts: number;
    totalRetryDelay: number;
}
