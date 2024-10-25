export interface PurchaseOrderResponse {
    purchaseOrder: PurchaseOrder;
}

export interface PurchaseOrder {
    uuid: string;
    deleted: string;
    deletedAt: string | null;
    deletedBy: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedReason: string | null;
    deletedNote: string | null;
    project: Project;
    purchasingSource: PurchasingSource;
    custom_id: string | null;
    default_ship: string | null;
    notes: string | null;
    status: string | null;
    shipping_option: string | null;
    ship_name: string | null;
    ship_address: string | null;
}

export interface Project {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string | null;
    deletedBy: string | null;
    deletedReason: string | null;
    deletedNote: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    status: string | null;
    project_type: string;
    stage: string;
    payment_schedule: string;
    sales_tax: string;
    labor_tax: string;
    total_margin: string;
    equipment_margin: string;
    equipment_total: string;
    labor_total: string;
    shipping_total: string;
    tax_total: string;
    budget: string | null;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    owner: Owner;
    client: Client;
    primary_contact_id: string | null;
    company_location_id: string;
    company_location_name: string;
}

export interface Client {
    uuid: string | null;
    name: string | null;
    type: string | null;
}

export interface Owner {
    _id: string | null;
    uuid: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
    dateOfBirth: string | null;
    address: string | null;
    employeeId: string | null;
    department: string | null;
    position: string | null;
    salary: string | null;
    hireDate: string | null;
    employmentStatus: string | null;
    role: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    deleted: string | null;
    deletedAt: string | null;
    projects: string | null;
    deletedReason: string | null;
    deletedNote: string | null;
    permissions: string | null;
    admin: string | null;
    image: string | null;
}

export interface PurchasingSource {
    uuid: string;
    deleted: string;
    deletedAt: string | null;
    deletedBy: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedReason: string | null;
    deletedNote: string | null;
    company_name: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string;
    default_ship: string;
    dealer_number: string | null;
}

///

export interface PurchaseOrderProductDetailResponse {
    purchaseOrderItemsList: PurchaseOrderItemsList;
}

export interface PurchaseOrderItemsList {
    purchaseOrderItems: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
    cost: string;
    full_name: string;
    order_notes: null;
    order_quantity: string;
    order_status: string;
    product: Product;
    project_quantity: string;
    short_description: string;
    source: Source;
    total_order_cost: string;
    uuid: string;
}

export interface Product {
    name: string;
    price: Price;
    sku: string;
    status: string;
    tags: string[];
    uuid: string;
    width: number | null;
}

export interface Price {
    cost: number;
    mapp: number;
    msrp: number;
    sell: number;
}

export interface Source {
    id: string | null;
    name: string | null;
}
