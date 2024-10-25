export interface SerializedProduct {
    number: string;
    uuid: string;
    project: string;
}

export type ExpandableViewFormState = {
    serials: SerializedProduct[];
};
