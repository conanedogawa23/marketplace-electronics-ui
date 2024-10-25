// types.ts
export interface InventoryListResponse {
    productList: InventoryItem[];
}

export interface ProductListResponse {
    product: FormattedInventoryResponseType;
}

interface VendorInput {
    id: string;
    price: number;
}

export interface InventoryItem {
    _id: string;
    name: string;
    description: string;
    price: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    deleted: boolean | null;
    deletedAt: string | null;
    deletedBy: string | null;
    deletedNote: string | null;
    deletedReason: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    category: string;
    manufacturer: string;
    uom: string;
    vendors: VendorInput[];
    attachments: string | null;
    width: number;
    height: number;
    weight: number;
    tags: string[];
    status: string;
    sku: string;
    uuid?: string;
    serializedProducts: SerializedProduct[];
    serialized: boolean | null;
}

export interface InventoryInput {
    shippingSell: string;
    sell: string | undefined;
    category: string;
    cost: string | undefined;
    description: string;
    height: number;
    //length: number;
    manufacturer: string;
    mapp: string | undefined;
    msrp: string | undefined;
    notes: string;
    productName: string;
    sellPrice: string;
    shippingCost: string;
    shippingSellPrice: string;
    sku: string;
    uom: string;
    weight: number;
    width: number;
    tags: string[];
}

// Define InventoryInput type in a separate file (e.g., types.ts)
export interface FormattedInventoryInput {
    name: string;
    sku: string;
    category: string;
    manufacturer: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    uom: string;
    description: string;
    attachments?: string[];
    image?: string;
    price?: {
        msrp: number;
        mapp: number;
        cost: number;
        sell: number;
        shippingCost: number;
        shippingSell: number;
    };
    quantity: number;
    tags: string[];
    status: string;
    minQuantity: number;
    maxQuantity: number;
    notes?: string;
    uuid?: string;
    type: string;
    vendors: VendorInput[];
}

export interface SerializedProduct {
    number: string;
    uuid: string;
    project: string;
}

export interface FormattedInventoryResponseType {
    name: string;
    sku: string;
    category: {
        name: string;
        uuid: string;
    };
    manufacturer: {
        name: string;
        uuid: string;
    };
    length: number;
    width: number;
    height: number;
    serialized: boolean | null;
    weight: number;
    uom: {
        name: string;
        uuid: string;
    };
    description: string;
    attachments?: AttachmentType[];
    serializedProducts: SerializedProduct[];
    image?: ImageType;
    price: {
        msrp: number;
        mapp: number;
        cost: number;
        sell: number;
        shippingCost: number;
        shippingSell: number;
    };
    quantity: number;
    tags: string[];
    status: string;
    minQuantity: number;
    maxQuantity: number;
    notes?: string;
    uuid?: string;
    type: string;
}
export interface AttachmentType {
    name: string;
    url: string;
    type: string;
    uuid: string;
}
export interface ImageType {
    url: string;
    name: string;
}

// QR CODE INTERFACE
export interface QrInput {
    serializeIds: SerializeId[];
    sku: string | null;
    type: string | null;
    uuid: string | null;
    name: string | null;
}
export interface SerializeId {
    id: string | null;
    uuid: string | null;
}
export interface QrInputs {
    qrInput: QrInput[];
}
