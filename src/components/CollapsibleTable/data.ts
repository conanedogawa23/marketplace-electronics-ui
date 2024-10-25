export interface ChildTableRow {
    item: string;
    serial_number: string;
    bin: string;
    quantity: number;
    po: string;
}

export interface RowData {
    Area: string;
    Position: string;
    Quantity: number;
    Description: string;
    childTable: ChildTableRow[];
}

// Define interfaces for the table headers
export interface HeadCell {
    id: keyof ChildTableRow | keyof RowData;
    label: string;
}

// Parent table header cells
export const parentHeadCells: HeadCell[] = [
    { id: 'Area', label: 'Area' },
    { id: 'Position', label: 'Position' },
    { id: 'Quantity', label: 'Quantity' },
    { id: 'Description', label: 'Description' },
];

// Child table header cells
export const childHeadCells: HeadCell[] = [
    { id: 'item', label: 'Item' },
    { id: 'serial_number', label: 'Serial Number' },
    { id: 'bin', label: 'Bin' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'po', label: 'PO' },
];
export const rows: RowData[] = [
    {
        Area: '1st Floor',
        Position: 'Rack 1 Shelf 1',
        Quantity: 10,
        Description: 'In the storage room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '1st Floor',
        Position: 'Rack 1 Shelf 2',
        Quantity: 5,
        Description: 'In the storage room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '2nd Floor',
        Position: 'Rack 1 Shelf 3',
        Quantity: 3,
        Description: 'In the conference room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '2nd Floor',
        Position: 'Rack 1 Shelf 4',
        Quantity: 7,
        Description: 'In the conference room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '3rd Floor',
        Position: 'Rack 1 Shelf 5',
        Quantity: 2,
        Description: 'In the school room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '3rd Floor',
        Position: 'Rack 1 Shelf 6',
        Quantity: 1,
        Description: 'In the school room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '4th Floor',
        Position: 'Rack 1 Shelf 7',
        Quantity: 4,
        Description: 'In the office room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
    {
        Area: '4th Floor',
        Position: 'Rack 1 Shelf 8',
        Quantity: 6,
        Description: 'In the office room',
        childTable: [
            {
                item: 'JBL Speaker L390',
                serial_number: '11091700',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
            {
                item: 'Absen A3 Pro',
                serial_number: 'TW-1024-LD',
                bin: 'B-1',
                quantity: 1,
                po: 'Manually Added',
            },
        ],
    },
];
