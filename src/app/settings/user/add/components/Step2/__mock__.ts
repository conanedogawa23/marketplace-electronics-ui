import { faker } from '@faker-js/faker';

import { type Permission } from '@/lib/redux/permission/types';
import { AccessLevel, Status } from '@/lib/redux/types';

// function to select random access level
const selectAccessLevel = (): AccessLevel => {
    const accessLevels = Object.values(AccessLevel);
    const randomIndex = faker.number.int({
        min: 0,
        max: accessLevels.length - 1,
    });

    return accessLevels[randomIndex];
};

// function to  generate dummy permission  using @faker-js/faker
const createPermission = (module: string): Permission => {
    return {
        _id: faker.string.uuid(),
        accessLevel: selectAccessLevel(),
        createdAt: faker.date.past().toISOString(),
        createdBy: null,
        description: null,
        feature: faker.lorem.word(),
        module: module,
        name: faker.lorem.word(),
        status: Status.Active,
        updatedAt: faker.date.recent().toISOString(),
        updatedBy: null,
        uuid: faker.string.uuid(),
    };
};

// function to generate dummy Response using @faker-js/faker
export const generateResponse = (
    length = 50,
): {
    modules: string[];
    permissions: Record<string, Permission[]>;
} => {
    const modules = Array.from({ length }, (_, i) => `Module ${i + 1}`);
    const permissions = modules.reduce((acc, module) => {
        return {
            ...acc,
            [module]: Array.from({ length }, () => createPermission(module)),
        };
    }, {});

    return { modules, permissions };
};
