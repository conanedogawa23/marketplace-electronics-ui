export interface ReceiveItemSearchResponse {
    receiveOrderList: ReceiveItemSearch[];
}

export type ReceiveItemSearch = {
    purchaseOrder: boolean;
    product: boolean;
    name: string;
    description: string;
    uuid: string;
};
