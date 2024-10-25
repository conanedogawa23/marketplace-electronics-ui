export function transformAutocompListData(data: any): string[] {
    const result: string[] = [];
    const stack: any[] = [data];

    while (stack.length > 0) {
        const obj = stack.pop();
        if (Array.isArray(obj)) {
            for (let i = obj.length - 1; i >= 0; i--) {
                const item = obj[i];
                if (typeof item === 'object' && item !== null) {
                    stack.push(item);
                } else if (typeof item === 'string') {
                    result.push(item);
                }
            }
        } else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach((value) => {
                if (typeof value === 'object' && value !== null) {
                    stack.push(value);
                } else if (typeof value === 'string') {
                    result.push(value);
                }
            });
        } else if (typeof obj === 'string') {
            result.push(obj);
        }
    }
    return result;
}
