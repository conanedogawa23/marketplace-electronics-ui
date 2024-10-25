export interface VendorHeadCellsProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}
export interface VendorRowProps {
    id: string;
    vendor: string;
    source: string;
    price: number;
    email: string;
}
export interface OptionTypeAutocompleteProps {
    label: string;
    value: string;
}
export interface OptionType {
    label: string;
    value: string;
}
