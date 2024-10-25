export interface APIError {
    name: string;
    message: string;
    stack: string;
}

export function isAPIError(value: unknown): value is APIError {
    return (
        typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        'message' in value &&
        'stack' in value &&
        typeof (value as APIError).name === 'string' &&
        typeof (value as APIError).message === 'string' &&
        typeof (value as APIError).stack === 'string'
    );
}

export function isEmpty<T extends Record<string, unknown>>(obj: T): boolean {
    return Object.getOwnPropertyNames(obj).length === 0;
}
