export function filterUniqueByUUID<T extends { uuid: string }>(array: T[]) {
    const seen = new Set();
    return array.filter((item) => {
        const uuid = item.uuid;
        if (seen.has(uuid)) {
            return false;
        }
        seen.add(uuid);
        return true;
    });
}
