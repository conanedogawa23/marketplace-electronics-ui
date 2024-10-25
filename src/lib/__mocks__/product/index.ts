import { faker } from '@faker-js/faker';

import { type AdjustmentTableDataType } from '@/components/adjustment-table/types';

import { SELECT_OPTIONS } from '@/lib/__mocks__/sub-locations/index';
import { type Product } from '@/lib/redux/products/types';
import { Status } from '@/lib/redux/types';

const generateCustomSerialNumber = () => {
    const prefix = faker.string.alphanumeric(3).toUpperCase();
    const middle = faker.string.alphanumeric(4).toUpperCase();
    const suffix = faker.string.alphanumeric(4).toUpperCase();
    return `${prefix}-${middle}-${suffix}`;
};

// function to make dummy Product using faker
export function makeProduct(): Product {
    return {
        _id: faker.string.uuid(),
        adjusted: faker.datatype.boolean(0.8),
        attachments: null,
        category: null,
        createdAt: faker.date.past().toISOString(),
        createdBy: null,
        deleted: null,
        deletedAt: null,
        deletedBy: null,
        deletedNote: null,
        deletedReason: null,
        description: faker.lorem.sentence(),
        height: faker.number.int(),
        length: faker.number.int(),
        manufacturer: null,
        maxQuantity: faker.number.int(),
        minQuantity: faker.number.int(),
        name: faker.commerce.productName(),
        notes: faker.lorem.sentence(),
        price: faker.commerce.price(),
        quantity: faker.number.int({
            min: 0,
            max: 10,
        }),
        serialized: faker.datatype.boolean(0.8),
        sku: faker.string.uuid(),
        status: faker.helpers.arrayElement([Status.Active]),
        tags: [faker.word.adjective(), faker.word.adjective()],
        type: null,
        uom: null,
        updatedAt: faker.date.recent().toISOString(),
        updatedBy: null,
        uuid: faker.string.uuid(),
        vendors: [],
        weight: faker.number.int(),
        width: faker.number.int(),
        serializedProducts: [],
    };
}

export function getProductListMock(length: number) {
    return Array.from({ length: length }, () => makeProduct());
}

export function getProductAdjustmentListMock(
    length: number,
): AdjustmentTableDataType[] {
    return Array.from({ length: length }, () => {
        const product = makeProduct();
        const changed = faker.number.int({
            min: 0,
            max: 10,
        });
        return {
            ...product,
            deleteSerialNumbers: false,
            serialsToAdd:
                changed > 0
                    ? Array.from({ length: changed }, () =>
                          generateCustomSerialNumber(),
                      )
                    : [],

            serialsToRemove: [],

            subLocation: SELECT_OPTIONS[faker.number.int({ min: 0, max: 3 })],

            initial: product.quantity,
            changed,
            final: product.quantity + changed,
        };
    });
}
